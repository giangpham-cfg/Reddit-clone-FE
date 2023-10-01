import { Modal } from "reactstrap";
// import { AiOutlineInfoCircle } from "react-icons/ai";
import { useState } from "react";
// import "./CreateSubreddit.css";
import { API } from "../api";

export default function EditPost({
  isOpenEditPostModal,
  setIsOpenEditPostModal,
  token,
  fetchPosts,
  post,
}) {
  const [title, setTitle] = useState(post.title);
  const [text, setText] = useState(post.text);

  const handleEditPost = async (e) => {
    e.preventDefault();
    // console.log("handleCreateSubreddit");
    const res = await fetch(`${API}/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        text,
      }),
    });
    const info = await res.json();
    if (info.success) {
      setTitle("");
      setText("");
      setIsOpenEditPostModal(false);
      fetchPosts();
    }
  };
  return (
    <Modal
      isOpen={isOpenEditPostModal}
      className={"modal-container"}
      size=""
      centered
    >
      <div className="modal-content">
        <div className="modal-header">
          <div className="header-text">Edit post</div>
          <div
            className="close header-text"
            onClick={() => setIsOpenEditPostModal(false)}
          >
            X
          </div>
        </div>
        <div className="modal-body">
          {/* <div className="header-text">Edit</div>
          <div className="post-by">
            Community names including capitalization cannot be changed.{" "}
            <AiOutlineInfoCircle />
          </div> */}
          <form className="subreddit-name-form" onSubmit={handleEditPost}>
            <input
              className="input-subreddit-name"
              value={title}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter new title"
            />
            <textarea
              className="input-text-comment"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter new post?"
            />
            <div className="reply-button-container">
              <button
                className="cancel-button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpenEditPostModal(false);
                }}
              >
                Cancel
              </button>
              <button className="comment-button">Edit post</button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
