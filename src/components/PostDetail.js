import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PostDetail() {
  const { id } = useParams(); // Extract ID from URL
  const [post, setPost] = useState(null);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <div>
        <h3>Title: {post.title}</h3>
        <p>Body: {post.body}</p>
        <button onClick={handleGoBack}>Go Back</button>
      </div>
    </div>
  );
}
