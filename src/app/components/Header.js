import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "../assets/css/Header.css";
import Logo from "../assets/images/logo.jpeg";

function Header() {
  const [headerColor, setHeaderColor] = useState(false);

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

  const headerClasses = `${
    pathname === "/"
      ? `header ${headerColor && "header__backgroundChange"}`
      : "header header__default"
  }`;

  const getLinkClasses = (linkPath) =>
    pathname === linkPath
      ? "header__rightLink header__rightLinkActive"
      : "header__rightLink";

  return (
    <header className={headerClasses}>
      <Link to="/" className="header__rightLink">
        <div className="header__left">
          <img src={Logo} alt="" className="header__logo" />
          <h3 className="header__title">Business Buzz Club</h3>
        </div>
      </Link>
      <nav className="header__right">
        <Link to="/" className={getLinkClasses("/")}>
          <div className="home">Home</div>
        </Link>
        <Link to="/events" className={getLinkClasses("/events")}>
          <div className="events">Events</div>
        </Link>
        <Link to="/register" className={getLinkClasses("/register")}>
          <div className="register">Sign Up</div>
        </Link>
        <Link to="/login" className={getLinkClasses("/login")}>
          <div className="login">Log In</div>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
