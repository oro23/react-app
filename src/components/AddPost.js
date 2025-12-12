import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function AddPost() {
  const { posts } = useSelector((state) => state.jsonph);
  const dispatch = useDispatch();

  const handleAddPost = () => {
    const newPost = {
      userId: 1,
      id: posts.length + 1,
      title: "New Post Title",
      body: "This is the body of the new post.",
    };
    dispatch({ type: "jsonph/addPost", payload: newPost });
  };

  return (
    <div className="container">
      <h2>Add Post Component</h2>
      <button onClick={handleAddPost} className="btn btn-primary btn-sm">
        Add Post
      </button>
    </div>
  );
}
