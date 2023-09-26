import { useOutletContext, useParams } from "react-router-dom";
import EachPost from "./EachPost";
import "./Post.css";
import { useState } from "react";
import { API } from "../api";

export default function Post() {
  const { posts, handleUpvote, handleDownvote, user, fetchPosts, token } =
    useOutletContext();
  const { postId } = useParams();
  const findpost = posts.find((post) => post.id === postId);
  const [text, setText] = useState("");

  const handleFirstComment = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text,
        subredditId: findpost.subreddit.id,
        parentId: postId,
      }),
    });
    const info = await res.json();
    console.log("child in Post", info);
    if (info.success) {
      fetchPosts();
    }
  };

  return (
    <div className="main-container">
      <div className="content-container">
        {findpost && (
          <div className="child-post">
            <EachPost
              post={findpost}
              handleUpvote={handleUpvote}
              handleDownvote={handleDownvote}
            />
          </div>
        )}
        <div className="comment-box">
          <p>Comment as {user.username}</p>
          <form className="comment-form" onSubmit={handleFirstComment}>
            <textarea
              className="input-text-comment"
              type="text"
              placeholder="What are your thoughts?"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <button className="comment-button">Comment</button>
          </form>
        </div>
      </div>
    </div>
  );
}
