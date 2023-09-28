import { useOutletContext } from "react-router-dom";
import EachPost from "./EachPost";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function Home() {
  const { posts, handleUpvote, handleDownvote, subreddits } =
    useOutletContext();

  return (
    <div className="home-page-container">
      <div className="subreddit-list-container">
        <button className="create-subreddit-button">Create community</button>
        {subreddits &&
          subreddits.map((subreddit) => (
            <div className="each-subreddit">
              <div>{subreddit.name}</div>
              <div className="edit-delete-icon">
                <div className="edit-icon">
                  <AiOutlineEdit />
                </div>
                <div className="edit-icon">
                  <RiDeleteBin6Line />
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="home-container">
        {posts &&
          posts.map((post) => {
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
