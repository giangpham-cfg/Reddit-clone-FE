import { Modal } from "reactstrap";
import "./Login.css";
import { useState } from "react";
import { API } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login({
  isOpenLoginModal,
  closeLoginModal,
  openRegisterModal,
  setToken,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch(`${API}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const info = await res.json();
    if (!info.success) {
      return setError(info.error);
    }
    setToken(info.token);
    localStorage.setItem("token", info.token);
    navigate("/");

    setPassword("");
    setUsername("");
    closeLoginModal();
  }
  return (
    <Modal
      isOpen={isOpenLoginModal}
      className={"login-modal-container"}
      size=""
      centered
    >
      <div className="login-modal-content">
        <span className="close" onClick={() => closeLoginModal()}>
          X
        </span>
        <br />
        <h5 className="login-text">Log In</h5>
        <form className="form" onSubmit={handleLogin}>
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button">Login</button>
          <div className="signup-link">
            New to Reddit?
            <a href="#" onClick={() => openRegisterModal()}>
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </Modal>
  );
}
