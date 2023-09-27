import { useState } from "react";
import "./ReplyComment.css";
import { API } from "../api";

export default function ReplyComment({
  setIsReplyingComment,
  child,
  fetchPosts,
  token,
  //   onReplySubmitted,
}) {
  const [text, setText] = useState("");
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
    if (info.success) {
      fetchPosts();
      setIsReplyingComment(false);
      //   onReplySubmitted();
    }
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
    </>
  );
}
