import { createContext, useState } from "react";

export const MoviesContext = createContext();

export function MoviesProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  return (
    <MoviesContext.Provider
      value={{ movies, setMovies, filteredMovies, setFilteredMovies }}
    >
      {children}
    </MoviesContext.Provider>
  );
}
