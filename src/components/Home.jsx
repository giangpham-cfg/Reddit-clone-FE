import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { TbArrowBigUp } from "react-icons/tb";
import { TbArrowBigDown } from "react-icons/tb";
import { FaRegCommentAlt } from "react-icons/fa";

export default function Home() {
  const { posts } = useOutletContext();

  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* <Link
        style={{ textDecoration: "none" }}
        className="post-container"
        // key={post.id}
        // to={`/posts/${post.id}`}
      >
        <div className="vote-container">
          <div className="arrow-icon">
            <TbArrowBigUp />
          </div>
          <div className="number-vote">1</div>
          <div className="arrow-icon">
            <TbArrowBigDown />
          </div>
        </div>
        <div className="post-content">
          <p className="subreddit">r/Style</p>
          <p className="title">New fashion</p>
          <p className="text">new trend this year</p>
          <div className="comment-container">
            <div className="comment-">
              <FaRegCommentAlt />
            </div>
            <div className="comment">23 comments</div>
          </div>
        </div>
      </Link> */}

      {posts.map((post) => {
        return (
          <Link
            style={{ textDecoration: "none" }}
            className="post-container"
            key={post.id}
            to={`/posts/${post.id}`}
          >
            <div className="vote-container">
              <div className="arrow-icon">
                <TbArrowBigUp />
              </div>
              <div className="number-vote">
                {post.upvotes.length - post.downvotes.length}
              </div>
              <div className="arrow-icon">
                <TbArrowBigDown />
              </div>
            </div>
            <div className="post-content">
              <p className="subreddit">
                r/{post.subreddit.name}
                <span className="post-by">
                  . Posted by u/{post.user.username}
                </span>
              </p>
              <p className="title">{post.title}</p>
              <p className="text">{post.text}</p>
              <div className="comment-container">
                <div className="comment-icon">
                  <FaRegCommentAlt />
                </div>
                <div
                  className="comment"
                  onClick={navigate(`/posts/${post.id}`)}
                >
                  {post.children.length} comments
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
