import { useOutletContext } from "react-router-dom";
import EachPost from "./EachPost";
import SideBar from "./SideBar";
import { useState } from "react";

export default function Home() {
  const {
    posts,
    handleUpvote,
    handleDownvote,
    subreddits,
    user,
    token,
    fetchSubreddits,
    fetchPosts,
  } = useOutletContext();

  const [isMobilePage, setIsMobilePage] = useState(false);

  return (
    <div className="home-page-container">
      <header>
        <div className="hamberger-wrapper">
          <button
            onClick={() => setIsMobilePage(!isMobilePage)}
            className={`hamberger-button ${isMobilePage ? " active" : ""}`}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
      <div className={`mobile-menu ${isMobilePage ? "active" : ""}`}>
        <SideBar
          subreddits={subreddits}
          fetchSubreddits={fetchSubreddits}
          token={token}
          user={user}
        />
      </div>
      <div className="home-container">
        {posts &&
          posts.map((post) => {
            return (
              <EachPost
                key={post.id}
                post={post}
                handleDownvote={handleDownvote}
                handleUpvote={handleUpvote}
                user={user}
                token={token}
                fetchPosts={fetchPosts}
              />
            );
          })}
      </div>
    </div>
  );
}
