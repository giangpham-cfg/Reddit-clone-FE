import { useActionData, useNavigate, useOutletContext } from "react-router-dom";
import EachPost from "./EachPost";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { API } from "../api";
import { useState } from "react";
import CreateSubreddit from "./CreateSubreddit";

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
    isDownvote,
    isUpvote,
  } = useOutletContext();
  const navigate = useNavigate();

  const [isOpenCreateSubredditModal, setIsOpenCreateSubredditModal] =
    useState(false);

  const handleDeleteSubreddit = async (subredditId) => {
    const res = await fetch(`${API}/subreddits/${subredditId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await res.json();
    if (info.success) {
      fetchSubreddits();
    }
  };

  return (
    <div className="home-page-container">
      <div className="subreddit-list-container">
        <button
          className="create-subreddit-button"
          onClick={() => setIsOpenCreateSubredditModal(true)}
        >
          Create community
        </button>
        {subreddits &&
          subreddits.map((subreddit) => (
            <div className="each-subreddit" key={subreddit.id}>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/subreddits/${subreddit.name}`)}
              >
                {subreddit.name}
              </div>
              {user && user.id === subreddit.userId ? (
                <div className="edit-delete-icon">
                  <div
                    className="edit-icon"
                    onClick={() => handleDeleteSubreddit(subreddit.id)}
                  >
                    <RiDeleteBin6Line />
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ))}
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

      <CreateSubreddit
        isOpenCreateSubredditModal={isOpenCreateSubredditModal}
        setIsOpenCreateSubredditModal={setIsOpenCreateSubredditModal}
        token={token}
        fetchSubreddits={fetchSubreddits}
      />
    </div>
  );
}
