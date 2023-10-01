import { Modal } from "reactstrap";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useState } from "react";
import "./CreateSubreddit.css";
import { API } from "../api";

export default function CreateSubreddit({
  isOpenCreateSubredditModal,
  setIsOpenCreateSubredditModal,
  token,
  fetchSubreddits,
}) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleCreateSubreddit = async (e) => {
    e.preventDefault();
    console.log("handleCreateSubreddit");
    const res = await fetch(`${API}/subreddits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
      }),
    });
    const info = await res.json();
    console.log("check create subreddit", info);
    if (!info.success) {
      return setError("You must login to create a community!");
    }
    setName("");
    setIsOpenCreateSubredditModal(false);
    fetchSubreddits();
  };
  return (
    <Modal
      isOpen={isOpenCreateSubredditModal}
      className={"modal-container"}
      size=""
      centered
    >
      <div className="modal-content">
        <div className="modal-header">
          <div className="header-text">Create a community</div>
          <div
            className="close header-text"
            onClick={() => {
              setIsOpenCreateSubredditModal(false);
              setError("");
              setName("");
            }}
          >
            X
          </div>
        </div>
        <div className="modal-body">
          <div className="header-text">Name</div>
          <div className="post-by">
            Community names including capitalization cannot be changed.{" "}
            <AiOutlineInfoCircle />
          </div>
          <form
            className="subreddit-name-form"
            onSubmit={handleCreateSubreddit}
          >
            <input
              className="input-subreddit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter community's name"
            />
            <div className="reply-button-container">
              <button
                className="cancel-button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpenCreateSubredditModal(false);
                  setName("");
                  setError("");
                }}
              >
                Cancel
              </button>
              <button className="comment-button">Create Community</button>
            </div>
          </form>
          <div className="error-post">{error}</div>
        </div>
      </div>
    </Modal>
  );
}
