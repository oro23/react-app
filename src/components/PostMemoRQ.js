import React from "react";
import { usePosts } from "../hooks/usePosts";
import { useDispatch } from "react-redux";
import { setSelectedPostId } from "../redux/uiSlice";
import { useNavigate } from "react-router-dom";
import PostItem from "./PostItem";

export default function PostMemoRQ() {
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
        <PostItem key={post.id} post={post} onClick={handleClick} />
      ))}
    </div>
  );
}
