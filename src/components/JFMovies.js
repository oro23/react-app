import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MoviesContext } from "../context/MoviesContext";

export default function JFMovies(props) {
  console.log("Movies props:", props);
  // const { setMovies, filteredMovies, setFilteredMovies } = props;

  const { setMovies, filteredMovies, setFilteredMovies } =
    useContext(MoviesContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, [currentPage]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://jsonfakery.com/movies/paginated?page=${currentPage}`
      );
      setMovies(response.data.data);
      setFilteredMovies(response.data.data);
      setLastPage(response.data.last_page);
      setLoading(false);
      console.log("Fetched movies:", response.data.current_page);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

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
    <>
      <h2>Movies List</h2>
      {loading && <p>Loading movies...</p>}
      <div className="row">
        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <div
              className="spinner-border text-primary"
              role="status"
              style={{ width: "4rem", height: "4rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          filteredMovies.map((movie) => (
            <div className="col-3 mb-3" key={`${movie.movie_id}-${movie.id}`}>
              <div className="card h-100">
                <img
                  src={movie.poster_path}
                  alt={movie.original_title}
                  className="card-img-top"
                  style={{ height: "250px", objectFit: "cover" }}
                />

                <div className="card-body">
                  <Link
                    to={`/MovieDetail/${movie.id}`}
                    state={{ movie: movie }}
                  >
                    <h5 className="card-title">{movie.original_title}</h5>
                  </Link>
                  <div className="d-flex flex-wrap gap-1 small">
                    <span className="badge bg-primary">
                      ⭐ {movie.vote_average}
                    </span>
                    <span className="badge bg-secondary">
                      👍 {movie.vote_count}
                    </span>
                    <span className="badge bg-success">
                      🔥 {movie.popularity}
                    </span>
                  </div>

                  <div className="mt-2 text-muted small">
                    📅 {movie.release_date}
                  </div>

                  {movie.adult === 1 && (
                    <span className="badge bg-danger mt-2">🔞 Adult</span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}

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
    </>
  );
}
