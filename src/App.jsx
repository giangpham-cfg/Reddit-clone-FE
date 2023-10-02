import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { API } from "./api";

export default function App() {
  const [subreddits, setSubreddits] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  // const [isUpvote, setIsUpvote] = useState(false);
  // const [isDownvote, setIsDownvote] = useState(false);

  const [posts, setPosts] = useState([]);

  async function fetchPosts() {
    const res = await fetch(`${API}/posts`);
    const info = await res.json();
    setPosts(info.posts);

    console.log(info);
  }

  async function fetchSubreddits() {
    const res = await fetch(`${API}/subreddits`);
    const info = await res.json();
    if (info.success) {
      setSubreddits(info.subreddits);
    }
  }
  useEffect(() => {
    fetchPosts();
    fetchSubreddits();
  }, []);

  async function fetchUser() {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      setToken(localToken);
    }
    if (!token) {
      return;
    }
    const res = await fetch(`${API}/users/token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await res.json();
    // console.log("check", info);
    if (info.success) {
      setUser(info.user);
    }
  }
  useEffect(() => {
    fetchUser();
  }, [token]);

  async function handleUpvote(post) {
    const upvote = post.upvotes.find((upvote) => upvote.userId === user.id);
    const downvote = post.downvotes.find(
      (downvote) => downvote.userId === user.id
    );
    let res;
    if (upvote) {
      res = await fetch(`${API}/votes/upvotes/${post.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } else if (downvote) {
      res = await fetch(`${API}/votes/downvotes/${post.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      res = await fetch(`${API}/votes/upvotes/${post.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } else {
      res = await fetch(`${API}/votes/upvotes/${post.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    }
    const info = await res.json();
    fetchPosts();
  }

  async function handleDownvote(post) {
    const downvote = post.downvotes.find(
      (downvote) => downvote.userId === user.id
    );
    const upvote = post.upvotes.find((upvote) => upvote.userId === user.id);
    let res;
    if (downvote) {
      res = await fetch(`${API}/votes/downvotes/${post.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } else if (upvote) {
      res = await fetch(`${API}/votes/upvotes/${post.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      res = await fetch(`${API}/votes/downvotes/${post.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } else {
      res = await fetch(`${API}/votes/downvotes/${post.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    }
    const info = await res.json();
    fetchPosts();
  }

  return (
    <>
      <Navbar user={user} setToken={setToken} setUser={setUser} />
      <Outlet
        context={{
          posts,
          subreddits,
          fetchPosts,
          token,
          handleDownvote,
          handleUpvote,
          user,
          fetchSubreddits,
        }}
      />
    </>
  );
}
