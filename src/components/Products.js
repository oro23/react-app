import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

export default function Products() {
  const dispatch = useDispatch();
  //   const movies = useSelector((state) => state.movie.movies);
  const { filteredProducts } = useSelector((state) => state.product);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts(currentPage));
  }, [dispatch, currentPage]);

  // const handleAdd = () => {
  //   dispatch(addToCart(product));
  // };

  const generatePageNumbers = () => {
    const pages = [];
    const window = 2; // how many pages around current page

    if (lastPage <= 7) {
      // Show all pages if few pages exist
      for (let i = 1; i <= lastPage; i++) pages.push(i);
      return pages;
    }

    pages.push(1); // always show first page

    // left ellipsis
    if (currentPage > window + 2) {
      pages.push("...");
    }

    // middle window
    for (
      let i = Math.max(2, currentPage - window);
      i <= Math.min(lastPage - 1, currentPage + window);
      i++
    ) {
      pages.push(i);
    }

    // right ellipsis
    if (currentPage < lastPage - (window + 1)) {
      pages.push("...");
    }

    pages.push(lastPage); // always show last page
    return pages;
  };

  const pagination = generatePageNumbers();

  return (
    <div className="row">
      {filteredProducts?.map((product) => (
        <div className="col-3 mb-3" key={product.id}>
          <div className="card h-100">
            <img
              src={product.image}
              alt={product.name}
              className="card-img-top"
              style={{ height: "250px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">${product.price}</p>
            </div>
            <div
              className="card-footer"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Link to={`/products/${product.id}`} className="btn btn-primary">
                View Details
              </Link>
              {/* implement cart */}
              <button
                className="btn btn-success"
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}

      <div style={{ marginTop: "20px" }}>
        {pagination.map((p, index) =>
          p === "..." ? (
            <span key={`${index}-${p}`} style={{ margin: "0 8px" }}>
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              style={{
                margin: "0 5px",
                padding: "5px 10px",
                backgroundColor: p === currentPage ? "#007bff" : "#f0f0f0",
                color: p === currentPage ? "#fff" : "#000",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {p}
            </button>
          )
        )}
      </div>
    </div>
  );
}
