import { useOutletContext, useParams } from "react-router-dom";
import "./Subreddit.css";
import EachPost from "./EachPost";

export default function Subreddit() {
  const { posts, handleUpvote, handleDownvote } = useOutletContext();
  const { name } = useParams();
  const filteredPosts = posts.filter((post) => post.subreddit.name === name);
  console.log("check filtered", filteredPosts);

  return (
    <div className="home-container">
      <div className="subreddit-header">
        <div className="subreddit-name">{name}</div>
        <button className="join">Join</button>
      </div>
      <div className="subreddit-posts-container">
        {filteredPosts.map((post) => {
          return (
            <EachPost
              key={post.id}
              post={post}
              handleDownvote={handleDownvote}
              handleUpvote={handleUpvote}
            />
          );
        })}
      </div>
    </div>
  );
}
