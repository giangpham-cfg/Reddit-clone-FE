import { TbArrowBigUp } from "react-icons/tb";
import { TbArrowBigDown } from "react-icons/tb";
import { FaRegCommentAlt } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import "./Comment.css";
import ReplyComment from "./ReplyComment";
import { API } from "../api";
import EditComment from "./EditComment";

export default function Comment({
  post,
  fetchPosts,
  handleUpvote,
  handleDownvote,
  token,
  user,
}) {
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [isReplyingComment, setIsReplyingComment] = useState(false);

  const handleDeleteComment = async (postId) => {
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
    <>
      <div className="top-container">
        {isEditingComment ? (
          <EditComment
            post={post}
            setIsEditingComment={setIsEditingComment}
            fetchPosts={fetchPosts}
            token={token}
          />
        ) : (
          <>
            <div className="user-comment">
              <div style={{ fontWeight: "600" }}>{post.user.username}</div>
              {user && post.userId === user.id ? (
                <div
                  className="edit-icon"
                  onClick={() => setIsEditingComment(true)}
                >
                  <AiOutlineEdit />
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="text text-comment">{post.text}</div>

            {isReplyingComment ? (
              <ReplyComment
                fetchPosts={fetchPosts}
                child={post}
                setIsReplyingComment={setIsReplyingComment}
                token={token}
              />
            ) : (
              <div className="comment-function">
                <div className="vote-comment-container">
                  <div
                    className="arrow-icon upvote"
                    onClick={() => handleUpvote(post)}
                  >
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
                <div
                  className="reply-delete"
                  onClick={() => setIsReplyingComment(true)}
                >
                  <div className="comment-icon">
                    <FaRegCommentAlt />
                  </div>
                  <div>Reply</div>
                </div>
                {user && post.userId === user.id ? (
                  <div
                    className="reply-delete"
                    onClick={() => handleDeleteComment(post.id)}
                  >
                    <div className="comment-icon">
                      <RiDeleteBin6Line />
                    </div>
                    <div>Delete</div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            )}

            {post.children &&
              post.children.map((comment) => (
                <Comment
                  key={comment.id}
                  post={comment}
                  fetchPosts={fetchPosts}
                  handleDownvote={handleDownvote}
                  handleUpvote={handleUpvote}
                  token={token}
                  user={user}
                />
              ))}
          </>
        )}
      </div>
    </>
  );
}
