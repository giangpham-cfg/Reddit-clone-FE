import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function Navbar({ setToken, user, setUser }) {
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);

  const openLoginModal = () => {
    setIsOpenLoginModal(true);
    setIsOpenRegisterModal(false);
  };

  const openRegisterModal = () => {
    setIsOpenRegisterModal(true);
    setIsOpenLoginModal(false);
  };

  const closeModals = () => {
    setIsOpenLoginModal(false);
    setIsOpenRegisterModal(false);
  };

  const handleLogout = () => {
    setToken("");
    setUser({});
    localStorage.removeItem("token");
  };

  return (
    <>
      <div className="navbar-container">
        <Link className="link" to={"/"}>
          <span className="home-icon">
            <IoMdHome />
          </span>
          Home
        </Link>
        <form action="submit">
          <div className="input">
            <span className="glass-icon">
              <IoIosSearch />
            </span>
            <input
              className="input-box"
              type="text"
              placeholder="Search Reddit"
            />
          </div>
        </form>
        {!user.id ? (
          <div className="link login" onClick={() => openLoginModal()}>
            Log In
          </div>
        ) : (
          <>
            <div>+</div>
            <div className="already-login">
              <span>Welcome {user.username}</span>
              <Link className="logout" onClick={handleLogout} to={"/"}>
                Log Out
              </Link>
            </div>
          </>
        )}
      </div>
      <Login
        isOpenLoginModal={isOpenLoginModal}
        closeLoginModal={closeModals}
        openRegisterModal={openRegisterModal}
        setToken={setToken}
      />
      <Register
        isOpenRegisterModal={isOpenRegisterModal}
        closeRegisterModal={closeModals}
        openLoginModal={openLoginModal}
        setToken={setToken}
      />
    </>
  );
}
