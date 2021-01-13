import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../assets/css/Header.css";
import Logo from "../assets/images/logo.jpeg";

function Header() {
  const [headerColor, setHeaderColor] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setHeaderColor(true);
      } else {
        setHeaderColor(false);
      }
    });
  }, []);

  return (
    <header className={`header ${headerColor && "header__backgroundChange"}`}>
      <Link to="/" className="header__rightLink">
        <div className="header__left">
          <img src={Logo} alt="" className="header__logo" />
          <h3 className="header__title">Business Buzz Club</h3>
        </div>
      </Link>
      <nav className="header__right">
        <Link to="/" className="header__rightLink">
          <div className="home">Home</div>
        </Link>
        <Link to="/events" className="header__rightLink">
          <div className="events">Events</div>
        </Link>
        <Link to="/register" className="header__rightLink">
          <div className="register">Sign Up</div>
        </Link>
        <Link to="/login" className="header__rightLink">
          <div className="login">Log In</div>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
