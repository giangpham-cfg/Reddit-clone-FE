import { VscNote } from "react-icons/vsc";
import { IoImageOutline } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";
import { LiaPollSolid } from "react-icons/lia";
import "./CreatePost.css";
import { Select } from "antd";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";
import { API } from "../api";

export default function CreatePost() {
  const { subreddits, token, fetchPosts } = useOutletContext();
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [subredditId, setSubredditId] = useState("");

  const navigate = useNavigate();

  const options = [];
  for (let i = 0; i < subreddits.length; i++) {
    options.push({
      value: subreddits[i].name,
      label: `r/${subreddits[i].name}`,
    });
  }
  const handleChangeOption = (value) => {
    const findSubreddit = subreddits.find(
      (subreddit) => subreddit.name === value
    );
    if (findSubreddit) {
      setSubredditId(findSubreddit.id);
    }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        text,
        subredditId,
      }),
    });
    const info = await res.json();
    if (!info.success) {
      return setError(info.error);
    }
    navigate("/");
    setText("");
    setTitle("");
    fetchPosts();
  };

  return (
    <div className="create-post-container">
      <div className="main-title">Creat a post</div>
      <Select
        className="select-community"
        style={{
          width: "40%",
        }}
        placeholder="Choose a subreddit"
        onChange={handleChangeOption}
        options={options}
      />
      <div className="post-box-container">
        <div className="tab-container">
          <div className="tab selected">
            <div className="note-icon">
              <VscNote />
            </div>
            <div className="function-name">Post</div>
          </div>
          <div className="tab">
            <div className="note-icon">
              <IoImageOutline />
            </div>
            <div className="function-name">Images and Video</div>
          </div>
          <div className="tab">
            <div className="note-icon">
              <IoIosLink />
            </div>
            <div className="function-name">Link</div>
          </div>
          <div className="tab">
            <div className="note-icon">
              <LiaPollSolid />
            </div>
            <div className="function-name">Poll</div>
          </div>
        </div>
        <form className="post-form" onSubmit={handleSubmitPost}>
          <input
            className="input-text"
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <textarea
            className="main-text input-text"
            placeholder="Text (optional)"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <button className="post-button">Post</button>
        </form>
        <div className="error-post">{error}</div>
      </div>
    </div>
  );
}
