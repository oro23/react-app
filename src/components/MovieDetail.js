import React from "react";
import { useLocation } from "react-router-dom";

export default function MovieDetail() {
  const location = useLocation();
  const { movie } = location.state || {};
  console.log("MovieDetail movie:", movie);

  return (
    <div className="container mt-4">
      {movie ? (
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={movie.poster_path}
                className="img-fluid rounded-start"
                alt={movie.original_title}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h2 className="card-title">{movie.original_title}</h2>
                <p className="card-text">{movie.overview}</p>
                <p className="card-text">
                  <small className="text-muted">
                    Release Date: {movie.release_date}
                  </small>
                </p>
                <p className="card-text">
                  <span className="badge bg-primary">
                    ⭐ {movie.vote_average}
                  </span>
                  <span className="badge bg-secondary ms-2">
                    👍 {movie.vote_count}
                  </span>
                  <span className="badge bg-success ms-2">
                    🔥 {movie.popularity}
                  </span>
                </p>
                {movie.adult === 1 && (
                  <span className="badge bg-danger mt-2">🔞 Adult</span>
                )}
                <div className="mt-3">
                  {movie.casts && movie.casts.length > 0 && (
                    <>
                      <h5>Casts:</h5>

                      {/* {movie.casts.map((cast) => (
                        <div key={cast.cast_id}>
                          <di className="d-flex align-items-center mb-2">
                            <img
                              src={cast.profile_path}
                              alt={cast.original_name}
                              style={{
                                width: "50px",
                                height: "75px",
                                objectFit: "cover",
                                borderRadius: "5px",
                              }}
                            />
                            <div className="ms-3">
                              <strong>{cast.original_name}</strong> as{" "}
                              {cast.character}
                            </div>
                          </di>
                        </div>
                      ))} */}

                      <div className="row">
                        {movie.casts.slice(0, 12).map((cast) => (
                          <div
                            key={cast.cast_id}
                            className="col-12 col-md-4 mb-3"
                          >
                            <div className="d-flex align-items-center">
                              <img
                                src={cast.profile_path}
                                alt={cast.original_name}
                                style={{
                                  width: "50px",
                                  height: "75px",
                                  objectFit: "cover",
                                  borderRadius: "5px",
                                }}
                              />
                              <div className="ms-3">
                                <strong>{cast.original_name}</strong> as{" "}
                                {cast.character}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No movie data available.</p>
      )}
    </div>
  );
}
