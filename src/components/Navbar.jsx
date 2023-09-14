import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function Navbar({ token, setToken, user, setUser }) {
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);

  const openLoginModal = () => {
    setIsOpenLoginModal(true);
    setIsOpenRegisterModal(false);
  };

  const openRegisterModal = () => {
    setIsOpenRegisterModal(true);
    setIsOpenLoginModal(false);
    console.log("Opening Register Modal");
  };

  const closeModals = () => {
    setIsOpenLoginModal(false);
    setIsOpenRegisterModal(false);
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
          <span>Welcome {user.username}</span>
        )}
      </div>
      <Login
        isOpenLoginModal={isOpenLoginModal}
        closeLoginModal={closeModals}
        openRegisterModal={openRegisterModal}
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
