import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UseEffectExample = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; // 10 posts per page
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/posts")
  //     .then((response) => response.json())
  //     .then((data) => setPosts(data));
  // }, []);

  // Fetch all posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate posts for current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Create page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  if (loading) return <p>Loading posts...</p>;
  return (
    <div className="container">
      {currentPosts.map((post) => (
        <div key={post.id}>
          <h3>
            Title: <Link to={`/PostDetail/${post.id}`}>{post.title}</Link>
          </h3>
          <p>Body: {post.body}</p>
        </div>
      ))}

      <div style={{ marginTop: "20px" }}>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            style={{
              margin: "0 5px",
              padding: "5px 10px",
              backgroundColor: number === currentPage ? "#007bff" : "#f0f0f0",
              color: number === currentPage ? "#fff" : "#000",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UseEffectExample;
