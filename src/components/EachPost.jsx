import { Link, useNavigate } from "react-router-dom";
import { TbArrowBigUp } from "react-icons/tb";
import { TbArrowBigDown } from "react-icons/tb";
import { FaRegCommentAlt } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { API } from "../api";
import { useState } from "react";
import EditPost from "./EditPost";

export default function EachPost({
  handleDownvote,
  handleUpvote,
  post,
  user,
  token,
  fetchPosts,
}) {
  const navigate = useNavigate();
  const [isOpenEditPostModal, setIsOpenEditPostModal] = useState(false);

  const handleDeletePost = async (postId) => {
    const res = await fetch(`${API}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await res.json();
    if (info.success) {
      fetchPosts();
    }
  };
  return (
    <div key={post.id} className="each-post-container">
      <div className="vote-container">
        <div className="arrow-icon upvote" onClick={() => handleUpvote(post)}>
          <TbArrowBigUp />
        </div>
        <div className="number-vote">
          {post.upvotes.length - post.downvotes.length}
        </div>
        <div
          className="arrow-icon downvote"
          onClick={() => handleDownvote(post)}
        >
          <TbArrowBigDown />
        </div>
      </div>
      <div className="right-part-container">
        <Link
          style={{ textDecoration: "none" }}
          className="post-container"
          key={post.id}
          to={`/posts/${post.id}`}
        >
          <div className="post-content">
            <p className="subreddit">
              r/{post.subreddit.name}{" "}
              <span className="post-by">
                . Posted by u/{post.user.username}
              </span>
            </p>
            <p className="title">{post.title}</p>
            <p className="text">{post.text}</p>
          </div>
        </Link>
        <div className="comment-container">
          <div className="comment-icon">
            <FaRegCommentAlt />
          </div>
          <div
            className="comment"
            onClick={() => navigate(`/posts/${post.id}`)}
          >
            {post.children.length} comments
          </div>
          {user && user.id === post.userId ? (
            <div
              className="comment-icon"
              onClick={() => setIsOpenEditPostModal(true)}
            >
              <AiOutlineEdit />
            </div>
          ) : (
            <div></div>
          )}
          {user && user.id === post.userId ? (
            <div
              className="comment-icon"
              onClick={() => handleDeletePost(post.id)}
            >
              <RiDeleteBin6Line />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <EditPost
        isOpenEditPostModal={isOpenEditPostModal}
        setIsOpenEditPostModal={setIsOpenEditPostModal}
        fetchPosts={fetchPosts}
        token={token}
        post={post}
      />
    </div>
  );
}
