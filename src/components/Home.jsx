import { Link, useOutletContext } from "react-router-dom";

export default function Home() {
  const { posts } = useOutletContext();
  return (
    <div className="home-container">
      {posts.map((post) => {
        return (
          <Link
            style={{ textDecoration: "none" }}
            className="post-container"
            key={post.id}
            to={`/posts/${post.id}`}
          >
            <p className="p subreddit">r/{post.subreddit.name}</p>
            <p className="p title">{post.title}</p>
            <p className="p text">{post.text}</p>
          </Link>
        );
      })}
    </div>
  );
}
