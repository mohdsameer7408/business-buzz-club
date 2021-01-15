import React from "react";

import "../assets/css/HomeScreen.css";
import About from "../components/About";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";

function HomeScreen() {
  return (
    <div className="home__screen">
      <div className="home__screenHero">
        <div className="club__description">
          <h1 className="test"> "LEARN </h1>
          <h1 className="test"> WITH FUN" </h1>
        </div>
      </div>
      <Gallery />
      <About />
      <Footer />
    </div>
  );
}

export default HomeScreen;
