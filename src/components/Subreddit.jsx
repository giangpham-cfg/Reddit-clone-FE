import { useOutletContext, useParams, Link } from "react-router-dom";
import { TbArrowBigUp } from "react-icons/tb";
import { TbArrowBigDown } from "react-icons/tb";
import { FaRegCommentAlt } from "react-icons/fa";
import "./Subreddit.css";

export default function Subreddit() {
  const { posts } = useOutletContext();
  const { name } = useParams();
  const filteredPosts = posts.filter((post) => post.subreddit.name === name);
  console.log("check name", name);
  console.log("check filtered", filteredPosts);
  return (
    <div className="home-container">
      <div className="subreddit-header">
        <div className="subreddit-name">{name}</div>
        <button className="join">Join</button>
      </div>
      <div>
        {filteredPosts.map((post) => {
          return (
            <div key={post.id} className="post-subreddit-container">
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
                  <p className="subreddit">r/{post.subreddit.name}</p>
                  <p className="title">{post.title}</p>
                  <p className="text">{post.text}</p>
                  <div className="comment-container">
                    <div className="comment-">
                      <FaRegCommentAlt />
                    </div>
                    <div className="comment">23 comments</div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
