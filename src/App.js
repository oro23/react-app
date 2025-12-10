import "./App.css";
// import Click from "./components/Click";
// import ClickCount from "./components/ClickCount";
// import Greet from "./components/Greet";
import Navbar from "./components/Navbar";
import UseEffectExample from "./components/UseEffect";
// import Tasks from "./components/Tasks";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PostDetail from "./components/PostDetail";
// import UseCallback from "./components/UseCallback";
// import { createContext, useContext, useState, useEffect } from "react";
// import Panel from "./ui/Panel";
// import UsersList from "./components/UsersList";
import Dashboard from "./components/NestedRoutes/Dashboard";
import Profile from "./components/NestedRoutes/Profile";
import Settings from "./components/NestedRoutes/Settings";
// import { ThemeContext } from "./hooks/useTheme";
import RHFPost from "./components/RHFPost";
import JFMovies from "./components/JFMovies";
import MovieDetail from "./components/MovieDetail";
import { MoviesProvider } from "./context/MoviesContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import ReduxMovies from "./components/ReduxMovies";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Products from "./components/Products";
// import AxiosForm from "./components/AxiosForm";
// import FormikForm from "./components/FormikForm";
// const ThemeContext = createContext("light");

// function UseContext() {
//   const theme = useContext(ThemeContext);
//   return (
//     <div>
//       <h1>Current Theme: {theme}</h1>
//     </div>
//   );
// }

function App() {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <MoviesProvider>
          {/* <UseContext /> */}
          {/* <AxiosForm /> */}
          {/* <FormikForm /> */}
          <div className={`App`}>
            <Navbar />
            <header className="App-header container">
              {/* <Greet name="Alice">
            <h2>I'm a Senior Software Engineer</h2>
          </Greet> */}
              {/* <Click /> */}
              {/* <Tasks /> */}
              {/* <ClickCount /> */}
              {/* <UseEffectExample /> */}
              {/* <UseCallback /> */}
              {/* <Panel theme={theme} toggleTheme={toggleTheme} /> */}
              {/* <UsersList /> */}

              <Routes>
                <Route path="/" element={<UseEffectExample />} />
                <Route path="/PostDetail/:id" element={<PostDetail />} />
                <Route path="/MovieDetail/:id" element={<MovieDetail />} />
                <Route path="/dashboard/*" element={<Dashboard />}>
                  <Route index element={<div>Welcome to Dashboard!</div>} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="add-post" element={<RHFPost />} />
                  <Route path="movie-list" element={<JFMovies />} />
                  <Route path="movies" element={<ReduxMovies />} />
                  <Route path="products" element={<Products />} />
                </Route>
              </Routes>
            </header>
          </div>
        </MoviesProvider>
      </ThemeContextProvider>
    </Provider>
  );
}

export default App;
