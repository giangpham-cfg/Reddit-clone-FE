import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import Post from "./components/Post.jsx";
import CreatePost from "./components/CreatePost.jsx";
import CreateCommunity from "./components/CreateCommunity.jsx";
// import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      // { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "posts/:postId", element: <Post /> },
      { path: "submit", element: <CreatePost /> },
      { path: "r/:name", element: <CreateCommunity /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
