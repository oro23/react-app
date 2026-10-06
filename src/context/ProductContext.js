import { createContext, useState } from "react";

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [filteredProducts, setFilteredProducts] = useState([]);

  return (
    <ProductsContext.Provider value={{ filteredProducts, setFilteredProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}
