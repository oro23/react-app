import axios from "axios";
import React from "react";

export default function AxiosForm() {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [response, setResponse] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { title, content };
    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        postData
      );
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <div style={{ width: "400px", margin: "200px auto" }}>
      <h2>Add a New Post</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
              className="form-control"
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Content:
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
              className="form-control"
              required
            />
          </label>
        </div>
        <button
          type="submit"
          style={{ padding: "10px 15px" }}
          className="btn btn-primary"
        >
          Submit Post
        </button>
      </form>

      {response && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <h3>Post Submitted Successfully!</h3>
          <p>
            <strong>ID:</strong> {response.id}
          </p>
        </div>
      )}
    </div>
  );
}
