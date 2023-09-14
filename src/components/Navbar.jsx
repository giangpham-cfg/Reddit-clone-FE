import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { useState } from "react";
import Login from "./Login";

export default function Navbar() {
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);

  const closeLoginModal = () => {
    setIsOpenLoginModal(false);
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
        <div className="link login" onClick={() => setIsOpenLoginModal(true)}>
          Log In
        </div>
      </div>
      <Login
        isOpenLoginModal={isOpenLoginModal}
        closeLoginModal={closeLoginModal}
      />
    </>
  );
}
