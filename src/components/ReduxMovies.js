import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../redux/movieSlice";
import { Link } from "react-router-dom";

export default function ReduxMovies() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie.movies);
  const currentPage = 1;

  useEffect(() => {
    dispatch(fetchMovies(currentPage));
  }, [dispatch, currentPage]);

  return (
    <div className="row">
      {movies.map((movie) => (
        <div className="col-3 mb-3" key={`${movie.movie_id}-${movie.id}`}>
          <div className="card h-100">
            <img
              src={movie.poster_path}
              alt={movie.original_title}
              className="card-img-top"
              style={{ height: "250px", objectFit: "cover" }}
            />

            <div className="card-body">
              <Link to={`/MovieDetail/${movie.id}`} state={{ movie: movie }}>
                <h5 className="card-title">{movie.original_title}</h5>
              </Link>
              <div className="d-flex flex-wrap gap-1 small">
                <span className="badge bg-primary">
                  ⭐ {movie.vote_average}
                </span>
                <span className="badge bg-secondary">
                  👍 {movie.vote_count}
                </span>
                <span className="badge bg-success">🔥 {movie.popularity}</span>
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
      ))}
    </div>
  );
}
