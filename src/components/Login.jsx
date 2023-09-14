import { Modal } from "reactstrap";
import "./Login.css";
export default function Login({ isOpenLoginModal, closeLoginModal }) {
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
        <form className="form">
          <input className="login-input" type="text" placeholder="Username" />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
          />
          <button className="login-button">Login</button>
          <div className="signup-link">
            New to Reddit? <a href="">Sign Up</a>
          </div>
        </form>
      </div>
    </Modal>
  );
}
