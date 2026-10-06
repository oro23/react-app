import React, { useEffect } from "react";
import useJsonPlaceholderStore from "../zuStore/useJsonPlaceholderStore";

export default function ZuPosts() {
  const { posts, loading, error, fetchPosts } = useJsonPlaceholderStore();

  useEffect(() => {
    fetchPosts(); // call the fetch function, not the posts array
  }, [fetchPosts]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h4>Zustand Posts</h4>
      {posts.map((post) => (
        <div key={post.id}>Title: {post.title}</div>
      ))}
    </div>
  );
}
