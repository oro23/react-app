import React, { memo } from "react";
import { Link } from "react-router-dom";

const PostItem = memo(({ post, onClick }) => {
  return (
    // <div className="post-item" onClick={() => onClick(post.id)}>
    //   <strong>{post.title}</strong>
    // </div>
    <Link to={`/PostDetail/${post.id}`} className="post-item">
      <strong>
        {post.id}-{post.title}
      </strong>
    </Link>
  );
});

export default PostItem;
