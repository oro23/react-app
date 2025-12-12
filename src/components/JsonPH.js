import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../redux/jsonphSlice";
import AddPost from "./AddPost";

export default function JsonPH() {
  const fetchPostsSuccess = useSelector((state) => state.jsonph.posts);
  const dispatch = useDispatch();

  const page = 101; // You can modify this to fetch different posts

  React.useEffect(() => {
    dispatch(fetchPosts(page));
  }, [dispatch, page]);

  return (
    <div className="container">
      <AddPost />
      <h2>JSON Placeholder Posts</h2>
      {fetchPostsSuccess.map((post) => (
        <div
          key={post.id}
          style={{ border: "1px solid black", margin: "10px", padding: "10px" }}
        >
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}
