import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import CreateSubreddit from "./CreateSubreddit";
import { API } from "../api";

export default function SideBar({ token, subreddits, fetchSubreddits, user }) {
  const navigate = useNavigate();
  const [isOpenCreateSubredditModal, setIsOpenCreateSubredditModal] =
    useState(false);

  const handleDeleteSubreddit = async (subredditId) => {
    try {
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
      } else {
        console.error("Failed to delete subreddit");
      }
    } catch (error) {
      console.error("Error deleting subreddit", error);
    }
  };

  return (
    <>
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

      <CreateSubreddit
        isOpenCreateSubredditModal={isOpenCreateSubredditModal}
        setIsOpenCreateSubredditModal={setIsOpenCreateSubredditModal}
        token={token}
        fetchSubreddits={fetchSubreddits}
      />
    </>
  );
}
