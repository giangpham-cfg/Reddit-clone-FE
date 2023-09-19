import { VscNote } from "react-icons/vsc";
import { IoImageOutline } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";
import { LiaPollSolid } from "react-icons/lia";
import "./CreatePost.css";

export default function CreatePost() {
  return (
    <div className="create-post-container">
      <div className="main-title">Creat a post</div>
      <select className="select-community">
        <option value="">Choose a community</option>
      </select>
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
          <input className="input-text" type="text" placeholder="Title" />
          <textarea
            className="main-text input-text"
            placeholder="Text (optional)"
          />
          <button className="post-button">Post</button>
        </form>
      </div>
    </div>
  );
}
