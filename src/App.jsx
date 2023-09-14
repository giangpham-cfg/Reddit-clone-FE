import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { API } from "./api";

export default function App() {
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

  return (
    <>
      <Navbar />
      <Outlet context={{ posts }} />
    </>
  );
}
