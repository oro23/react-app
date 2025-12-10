import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function RHFPost() {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        data
      );
      console.log("Post created:", response.data);
      alert("Post created successfully!");

      reset(); // clear form
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div style={{ maxWidth: 400 }}>
      <h2>Create Post</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Title</label>
          <input
            {...register("title", { required: true })}
            className="form-control"
          />
        </div>
        <div>
          <label>Body</label>
          <textarea
            {...register("body", { required: true })}
            className="form-control"
          ></textarea>
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Add Post
        </button>
      </form>
    </div>
  );
}
