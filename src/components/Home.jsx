import { useOutletContext } from "react-router-dom";
import EachPost from "./EachPost";

export default function Home() {
  const { posts, handleUpvote, handleDownvote } = useOutletContext();

  return (
    <div className="home-container">
      {posts.map((post) => {
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
  );
}
