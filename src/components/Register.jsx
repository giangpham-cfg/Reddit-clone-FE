import { Modal } from "reactstrap";
import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

export default function Register({
  isOpenRegisterModal,
  closeRegisterModal,
  openLoginModal,
  setToken,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    const res = await fetch(`${API}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    closeRegisterModal();
  }

  return (
    <Modal
      isOpen={isOpenRegisterModal}
      className={"login-modal-container"}
      size=""
      centered
    >
      <div className="login-modal-content">
        <span className="close" onClick={() => closeRegisterModal()}>
          X
        </span>
        <br />
        <h5 className="login-text">Sign Up</h5>
        <form className="form" onSubmit={handleRegister}>
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
          <button className="login-button">Sign Up</button>
          <div className="signup-link">
            Already a redditor?
            <a href="#" onClick={() => openLoginModal()}>
              Log In
            </a>
          </div>
        </form>
      </div>
    </Modal>
  );
}
