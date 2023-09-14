import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { API } from "./api";

export default function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  const [posts, setPosts] = useState([]);
  async function fetchPosts() {
    const res = await fetch(`${API}/posts`);
    const info = await res.json();
    setPosts(info.posts);
    console.log(posts);
  }
  useEffect(() => {
    fetchPosts();
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
    console.log("check", info);
    if (info.success) {
      setUser(info.user);
    }
  }
  useEffect(() => {
    fetchUser();
  }, [token]);

  console.log("check token", token);

  return (
    <>
      <Navbar user={user} token={token} setToken={setToken} setUser={setUser} />
      <Outlet context={{ posts }} />
    </>
  );
}
