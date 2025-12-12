import { Routes, Route } from "react-router-dom";
// import UseEffectExample from "../components/UseEffect";
import PostDetail from "../components/PostDetail";
import MovieDetail from "../components/MovieDetail";
import Cart from "../components/Cart";
import Dashboard from "../components/NestedRoutes/Dashboard";
import Profile from "../components/NestedRoutes/Profile";
import Settings from "../components/NestedRoutes/Settings";
import RHFPost from "../components/RHFPost";
import JFMovies from "../components/JFMovies";
import ReduxMovies from "../components/ReduxMovies";
import Products from "../components/Products";
import Login from "../components/Login";
import RQPosts from "../components/RQPosts";

const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<UseEffectExample />} /> */}
      <Route path="/" element={<RQPosts />} />
      <Route path="/PostDetail/:id" element={<PostDetail />} />
      <Route path="/MovieDetail/:id" element={<MovieDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
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
  );
};

export default AppRoutes;
