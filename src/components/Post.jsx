import { useOutletContext, useParams } from "react-router-dom";
import EachPost from "./EachPost";
import "./Post.css";
import { useState } from "react";
import { API } from "../api";
import Comment from "./Comment";

export default function Post() {
  const { posts, handleUpvote, handleDownvote, user, fetchPosts, token } =
    useOutletContext();
  const { postId } = useParams();
  const findpost = posts.find((post) => post.id === postId);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

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
    if (!info.success) {
      return setError("You must login to comment on a post!");
    }
    fetchPosts();
    setText("");
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
              user={user}
              token={token}
              fetchPosts={fetchPosts}
            />
          </div>
        )}
        <div className="comment-box">
          <p>
            Comment as
            <span
              style={{
                color: "#0279d3",
                fontWeight: "600",
                paddingLeft: "5px",
              }}
            >
              {user.username}
            </span>
          </p>
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
          <div className="error-post">{error}</div>
        </div>
        <div className="all-comment-container">
          {findpost &&
            findpost.children &&
            findpost.children.map((post) => (
              <Comment
                key={post.id}
                post={post}
                fetchPosts={fetchPosts}
                handleDownvote={handleDownvote}
                handleUpvote={handleUpvote}
                token={token}
                user={user}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
