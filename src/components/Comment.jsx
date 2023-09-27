import { TbArrowBigUp } from "react-icons/tb";
import { TbArrowBigDown } from "react-icons/tb";
import { FaRegCommentAlt } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import "./Comment.css";
import ReplyComment from "./ReplyComment";

export default function Comment({
  post,
  fetchPosts,
  handleUpvote,
  handleDownvote,
  token,
}) {
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [isReplyingComment, setIsReplyingComment] = useState(false);

  console.log("check post", post);
  return (
    <>
      {/* {post &&
        post.children &&
        post.children.map((child) => ( */}
      <div className="top-container">
        <div className="user-comment">
          <div>{post.user.username}</div>
          <div className="edit-icon" onClick={() => setIsEditingComment(true)}>
            <AiOutlineEdit />
          </div>
        </div>
        <div className="text text-comment">{post.text}</div>

        {isReplyingComment ? (
          <ReplyComment
            fetchPosts={fetchPosts}
            child={post}
            setIsReplyingComment={setIsReplyingComment}
            token={token}
            // onReplySubmitted={() => setIsReplyingComment(false)}
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
            <div className="reply-delete">
              <div className="comment-icon">
                <RiDeleteBin6Line />
              </div>
              <div>Delete</div>
            </div>
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
            />
          ))}
      </div>
    </>
  );
}
