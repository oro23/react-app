import React from "react";
import { usePosts } from "../hooks/usePosts";
import { useDispatch } from "react-redux";
import { setSelectedPostId } from "../redux/uiSlice";
import { useNavigate, Link } from "react-router-dom";

export default function RQPosts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading, error } = usePosts();
  if (error) return <p>Error fetching posts</p>;

  if (isLoading) return <p>Loading...</p>;

  const handleClick = (id) => {
    dispatch(setSelectedPostId(id));
    navigate(`/PostDetail/${id}`);
  };

  return (
    <div>
      <h2>Posts</h2>
      {data.map((post) => (
        <div
          key={post.id}
          style={{ cursor: "pointer", marginBottom: "12px" }}
          onClick={() => handleClick(post.id)}
          // to={`/PostDetail/${post.id}`}
        >
          <strong>{post.title}</strong>
        </div>
      ))}
    </div>
  );
}
