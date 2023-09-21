import { VscNote } from "react-icons/vsc";
import { IoImageOutline } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";
import { LiaPollSolid } from "react-icons/lia";
import "./CreatePost.css";
import { Select } from "antd";
import { Tabs } from "antd";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";

export default function CreatePost() {
  const { subreddits } = useOutletContext();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [subreddit, setSubreddit] = useState("");

  const options = [];
  for (let i = 0; i < subreddits.length; i++) {
    options.push({
      value: subreddits[i].name,
      label: `r/${subreddits[i].name}`,
    });
  }
  const handleChangeOption = (value) => {
    setSubreddit(value);
  };
  return (
    <div className="create-post-container">
      <div className="main-title">Creat a post</div>
      <Select
        className="select-community"
        style={{
          width: "40%",
        }}
        placeholder="Choose a community"
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
        <form className="post-form">
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
      </div>
    </div>
  );
}
