import { Link, useNavigate } from "react-router-dom";
import { TbArrowBigUp } from "react-icons/tb";
import { TbArrowBigDown } from "react-icons/tb";
import { FaRegCommentAlt } from "react-icons/fa";

export default function EachPost({ handleDownvote, handleUpvote, post }) {
  const navigate = useNavigate();
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
      <Link
        style={{ textDecoration: "none" }}
        className="post-container"
        key={post.id}
        to={`/posts/${post.id}`}
      >
        <div className="post-content">
          <p className="subreddit">
            r/{post.subreddit.name}{" "}
            <span className="post-by">. Posted by u/{post.user.username}</span>
          </p>
          <p className="title">{post.title}</p>
          <p className="text">{post.text}</p>
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
          </div>
        </div>
      </Link>
    </div>
  );
}
