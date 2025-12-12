import React from "react";
import { usePosts } from "../hooks/usePosts";
import { useDispatch } from "react-redux";
import { setSelectedPostId } from "../redux/uiSlice";

export default function RQPosts() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = usePosts();
  if (error) return <p>Error fetching posts</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Posts</h2>
      {data.map((post) => (
        <div
          key={post.id}
          style={{ cursor: "pointer", marginBottom: "12px" }}
          onClick={() => dispatch(setSelectedPostId(post.id))}
        >
          <strong>{post.title}</strong>
        </div>
      ))}
    </div>
  );
}
