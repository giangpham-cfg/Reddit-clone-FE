import { useState } from "react";
import "./ReplyComment.css";
import { API } from "../api";

export default function ReplyComment({
  setIsReplyingComment,
  child,
  fetchPosts,
  token,
}) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const handleReplyComment = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text,
        parentId: child.id,
        subredditId: child.subreddit.id,
      }),
    });
    const info = await res.json();
    console.log("child", info);
    if (!info.success) {
      return setError("You must login to reply on a comment!");
    }
    fetchPosts();
    setIsReplyingComment(false);
  };
  return (
    <>
      <form className="comment-form" onSubmit={handleReplyComment}>
        <textarea
          className="input-text-comment"
          type="text"
          placeholder="What are your thoughts?"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <div className="reply-button-container">
          <button
            className="cancel-button"
            onClick={() => setIsReplyingComment(false)}
          >
            Cancel
          </button>
          <button className="comment-button">Reply</button>
        </div>
      </form>
      <div className="error-post">{error}</div>
    </>
  );
}
