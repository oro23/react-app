import { Link } from "react-router-dom";
import debounce from "lodash/debounce";
import { useMemo, useEffect, useState, useContext } from "react";
import { MoviesContext } from "../context/MoviesContext";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar(props) {
  // const { movies, setFilteredMovies } = props;

  const { movies, setFilteredMovies } = useContext(MoviesContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [inputValue, setInputValue] = useState("");

  // Debounced filter function
  const debouncedSearch = useMemo(
    () =>
      debounce((searchTerm) => {
        if (!searchTerm) {
          setFilteredMovies(movies); // reset if empty
          return;
        }
        const filtered = movies.filter((movie) =>
          movie.original_title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMovies(filtered);
      }, 500),
    [movies, setFilteredMovies]
  );

  // Call debounce when inputValue changes
  useEffect(() => {
    debouncedSearch(inputValue);
  }, [inputValue, debouncedSearch]);

  // Handle input change
  const handleChange = (e) => {
    setInputValue(e.target.value); // store raw value
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  return (
    <div className="container">
      <nav className={`navbar navbar-expand-lg navbar-${theme} bg-${theme}`}>
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/dashboard"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dashboard
                </Link>
                <ul className={`dropdown-menu bg-${theme}`}>
                  <li>
                    <Link
                      className="nav-link"
                      to="/dashboard/profile"
                      style={{
                        color: theme === "dark" ? "white" : "black",
                      }}
                    >
                      Profile
                    </Link>
                    <Link
                      className="nav-link"
                      to="/dashboard/settings"
                      style={{
                        color: theme === "dark" ? "white" : "black",
                      }}
                    >
                      Settings
                    </Link>
                    <Link
                      className="nav-link"
                      to="/dashboard/add-post"
                      style={{
                        color: theme === "dark" ? "white" : "black",
                      }}
                    >
                      Post
                    </Link>
                    <Link
                      className="nav-link"
                      to="/dashboard/movie-list"
                      style={{
                        color: theme === "dark" ? "white" : "black",
                      }}
                    >
                      Movies
                    </Link>
                    <Link
                      className="nav-link"
                      to="/dashboard/movies"
                      style={{
                        color: theme === "dark" ? "white" : "black",
                      }}
                    >
                      Movies List
                    </Link>
                    <Link
                      className="nav-link"
                      to="/dashboard/products"
                      style={{
                        color: theme === "dark" ? "white" : "black",
                      }}
                    >
                      Products
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true" href="/">
                  Disabled
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search movies..."
                onChange={handleChange}
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <div
              className={`ml-2 form-check form-switch text-${
                theme === "light" ? "dark" : "light"
              }`}
              style={{ marginLeft: "10px" }}
            >
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                checked={theme === "dark" ? true : false}
                id="switchCheckDefault"
                onChange={toggleTheme}
              />
              <label className="form-check-label" htmlFor="switchCheckDefault">
                Enable Dark Mode
              </label>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
