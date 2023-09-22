import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { API } from "./api";

export default function App() {
  const [subreddits, setSubreddits] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

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

  console.log(posts);

  return (
    <>
      <Navbar user={user} setToken={setToken} setUser={setUser} />
      <Outlet context={{ posts, subreddits, fetchPosts, token }} />
    </>
  );
}
