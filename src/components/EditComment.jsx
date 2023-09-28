import { useState } from "react";
import { API } from "../api";
import "./EditComment.css";

export default function EditComment({
  fetchPosts,
  post,
  setIsEditingComment,
  token,
}) {
  const [text, setText] = useState(post.text);
  const handleEditComment = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });
    const info = await res.json();
    if (info.success) {
      setIsEditingComment(false);
      fetchPosts();
    }
  };

  return (
    <>
      <form onSubmit={handleEditComment} className="comment-form">
        <textarea
          className="input-text-comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter new comment?"
        />
        <div className="reply-button-container">
          <button className="comment-button">Edit comment</button>
          <button
            className="cancel-button"
            onClick={(e) => {
              e.preventDefault();
              setIsEditingComment(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
