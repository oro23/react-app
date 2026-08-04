using System.IO.Compression;
using System.Xml.Linq;

namespace BrokersWorld.Library
{
    using System.IO.Compression;
    using System.Xml.Linq;

    public class RichCellImageReader
    {
        private static readonly XNamespace Main = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";
        private static readonly XNamespace RelNs = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
        private static readonly XNamespace PkgRelNs = "http://schemas.openxmlformats.org/package/2006/relationships";
        private static readonly XNamespace RichDataNs = "http://schemas.microsoft.com/office/spreadsheetml/2017/richdata";
        private static readonly XNamespace RichDataRelNs = "http://schemas.microsoft.com/office/spreadsheetml/2022/richvaluerel";
        private static readonly XNamespace XlrdNs = "http://schemas.microsoft.com/office/spreadsheetml/2017/richdata";

        /// <summary>
        /// Returns: sheetName -> rowNumber -> list of (imageBytes, fileExtension)
        /// for every cell using Excel's "Place in Cell" rich-value image feature.
        /// Returns an empty dictionary if the workbook has no rich-value images (older/simple files).
        /// </summary>
        public static Dictionary<string, Dictionary<int, List<(byte[] Bytes, string Ext)>>> BuildImageMap(byte[] xlsxBytes)
        {
            var result = new Dictionary<string, Dictionary<int, List<(byte[], string)>>>(StringComparer.OrdinalIgnoreCase);

            using var ms = new MemoryStream(xlsxBytes);
            using var zip = new ZipArchive(ms, ZipArchiveMode.Read);

            // Bail out early if this workbook has no rich data at all
            if (zip.GetEntry("xl/metadata.xml") == null || zip.GetEntry("xl/richData/rdrichvalue.xml") == null)
                return result;

            XDocument LoadXml(string path)
            {
                var entry = zip.GetEntry(path);
                if (entry == null) return null;
                using var s = entry.Open();
                return XDocument.Load(s);
            }

            // 1) sheet name -> worksheet part path, via workbook.xml + workbook.xml.rels
            var workbookXml = LoadXml("xl/workbook.xml");
            var workbookRels = LoadXml("xl/_rels/workbook.xml.rels");
            var relIdToTarget = workbookRels.Root.Elements(PkgRelNs + "Relationship")
                .ToDictionary(e => e.Attribute("Id").Value, e => e.Attribute("Target").Value);

            var sheetNameToPart = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
            foreach (var sheet in workbookXml.Root.Element(Main + "sheets").Elements(Main + "sheet"))
            {
                var name = sheet.Attribute("name").Value;
                var rId = sheet.Attribute(RelNs + "id").Value;
                if (relIdToTarget.TryGetValue(rId, out var target))
                {
                    var partPath = "xl/" + target.TrimStart('/').Replace("xl/", "");
                    sheetNameToPart[name] = partPath;
                }
            }

            // 2) valueMetadata[i] -> futureMetadata index
            var metadataXml = LoadXml("xl/metadata.xml");
            var valueMetadataList = metadataXml.Root.Element(Main + "valueMetadata")?.Elements(Main + "bk").ToList()
                                     ?? new List<XElement>();
            var valueMetaToFutureIndex = valueMetadataList
                .Select(bk => bk.Element(Main + "rc")?.Attribute("v")?.Value)
                .Select(v => v != null ? int.Parse(v) : -1)
                .ToList();

            // 3) futureMetadata[i] -> rdrichvalue rv index (xlrd:rvb i="N")
            var futureMetaList = metadataXml.Root.Elements(Main + "futureMetadata")
                .FirstOrDefault(f => f.Attribute("name")?.Value == "XLRICHVALUE")
                ?.Elements(Main + "bk").ToList() ?? new List<XElement>();
            var futureIndexToRvIndex = futureMetaList
                .Select(bk => bk.Descendants(XlrdNs + "rvb").FirstOrDefault()?.Attribute("i")?.Value)
                .Select(i => i != null ? int.Parse(i) : -1)
                .ToList();

            // 4) rdrichvalue.xml rv[i] -> LocalImageIdentifier (first <v>)
            var rvDataXml = LoadXml("xl/richData/rdrichvalue.xml");
            var rvList = rvDataXml.Root.Elements(RichDataNs + "rv").ToList();
            var rvToLocalImageId = rvList
                .Select(rv => rv.Elements(RichDataNs + "v").FirstOrDefault()?.Value)
                .Select(v => v != null ? int.Parse(v) : -1)
                .ToList();

            // 5) richValueRel.xml ordered rIds, indexed by LocalImageIdentifier
            var richValueRelXml = LoadXml("xl/richData/richValueRel.xml");
            var richRelRIds = richValueRelXml?.Root.Elements(RichDataRelNs + "rel")
                .Select(e => e.Attribute(RelNs + "id")?.Value)
                .ToList() ?? new List<string>();

            // 6) richValueRel.xml.rels: rId -> ../media/imageN.png
            var richValueRelRels = LoadXml("xl/richData/_rels/richValueRel.xml.rels");
            var richRelIdToTarget = richValueRelRels?.Root.Elements(PkgRelNs + "Relationship")
                .ToDictionary(e => e.Attribute("Id").Value, e => e.Attribute("Target").Value)
                ?? new Dictionary<string, string>();

            byte[] ResolveImageBytesForVm(int vm)
            {
                // vm attribute is 1-based
                int vmIdx = vm - 1;
                if (vmIdx < 0 || vmIdx >= valueMetaToFutureIndex.Count) return null;

                int futureIdx = valueMetaToFutureIndex[vmIdx];
                if (futureIdx < 0 || futureIdx >= futureIndexToRvIndex.Count) return null;

                int rvIdx = futureIndexToRvIndex[futureIdx];
                if (rvIdx < 0 || rvIdx >= rvToLocalImageId.Count) return null;

                int localImageId = rvToLocalImageId[rvIdx];
                if (localImageId < 0 || localImageId >= richRelRIds.Count) return null;

                var rId = richRelRIds[localImageId];
                if (rId == null || !richRelIdToTarget.TryGetValue(rId, out var target)) return null;

                // target looks like "../media/image4.png" relative to xl/richData/
                var normalized = "xl/" + target.Replace("../", "").TrimStart('/');
                var entry = zip.GetEntry(normalized);
                if (entry == null) return null;

                using var es = entry.Open();
                using var outMs = new MemoryStream();
                es.CopyTo(outMs);
                return outMs.ToArray();
            }

            // 7) walk every sheet's cells looking for t="e" vm="N" in any column, grab row number
            foreach (var (sheetName, partPath) in sheetNameToPart)
            {
                var sheetXml = LoadXml(partPath);
                if (sheetXml == null) continue;

                var rowMap = new Dictionary<int, List<(byte[], string)>>();

                foreach (var cell in sheetXml.Descendants(Main + "c"))
                {
                    var vmAttr = cell.Attribute("vm");
                    if (vmAttr == null) continue;

                    var cellRef = cell.Attribute("r")?.Value; // e.g. "G2"
                    if (cellRef == null) continue;
                    var rowNum = int.Parse(new string(cellRef.Where(char.IsDigit).ToArray()));

                    var bytes = ResolveImageBytesForVm(int.Parse(vmAttr.Value));
                    if (bytes == null) continue;

                    if (!rowMap.ContainsKey(rowNum)) rowMap[rowNum] = new List<(byte[], string)>();
                    rowMap[rowNum].Add((bytes, "png")); // media files here are PNG; adjust if other formats appear
                }

                result[sheetName] = rowMap;
            }

            return result;
        }
    }
}
