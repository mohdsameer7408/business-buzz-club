import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import { useDispatch, useSelector } from "react-redux";

import "../assets/css/Header.css";
import Logo from "../assets/images/logo.jpeg";
import { selectUser, signOutAsync } from "../features/authSlice";

function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [headerColor, setHeaderColor] = useState(false);
  const [isNavOpened, setIsNavOpened] = useState(false);

  useEffect(() => {
    const headerChangeHandler = () => {
      if (window.scrollY > 300) {
        setHeaderColor(true);
      } else {
        setHeaderColor(false);
      }
    };

    window.addEventListener("scroll", headerChangeHandler);

    return () => {
      window.removeEventListener("scroll", headerChangeHandler);
    };
  }, []);

  const { pathname } = useLocation();

  useEffect(() => {
    setIsNavOpened(false);
  }, [pathname]);

  const navHandler = () => {
    setIsNavOpened((prevState) => !prevState);
  };

  const headerClasses =
    pathname === "/"
      ? `header ${headerColor && "header__backgroundChange"}`
      : "header header__default";

  const getLinkClasses = (linkPath) =>
    pathname === linkPath
      ? "header__rightLink header__rightLinkActive"
      : "header__rightLink";

  const signOutUser = async () => {
    try {
      await dispatch(signOutAsync());
    } catch (error) {
      alert(error);
    }
  };

  return (
    <header className={headerClasses}>
      <div className="burger" onClick={navHandler}>
        <MenuOpenIcon />
      </div>
      <Link to="/" className="header__rightLink">
        <div className="header__left">
          <img src={Logo} alt="bbc" className="header__logo" />
          <h3 className="header__title">Business Buzz Club</h3>
        </div>
      </Link>
      <nav className={`header__right ${isNavOpened && "header__rightActive"}`}>
        <div className="header__rightLink close__container">
          <div className="close" onClick={navHandler}>
            &times;
          </div>
        </div>
        <Link to="/" className={getLinkClasses("/")}>
          <div className="home">Home</div>
        </Link>
        <Link to="/events" className={getLinkClasses("/events")}>
          <div className="events">Events</div>
        </Link>
        {user ? (
          <Link to="/profile" className={getLinkClasses("/profile")}>
            <div className="register">Hey, {user.name.slice(0, 5)}</div>
          </Link>
        ) : (
          <Link to="/register" className={getLinkClasses("/register")}>
            <div className="register">Sign Up</div>
          </Link>
        )}
        {user ? (
          <div
            style={{ cursor: "pointer" }}
            className="header__rightLink"
            onClick={signOutUser}
          >
            <div className="login">Log Out</div>
          </div>
        ) : (
          <Link to="/login" className={getLinkClasses("/login")}>
            <div className="login">Log In</div>
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
