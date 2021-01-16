import React from "react";
import { Button } from "@material-ui/core";

import "../assets/css/HomeScreen.css";
import About from "../components/About";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import OurTeam from "../components/OurTeam";

function HomeScreen() {
  return (
    <div className="home__screen">
      <div className="home__screenHero">
        <div className="club__description">
          <h1 className="test"> "LEARN </h1>
          <h1 className="test"> WITH FUN" </h1>
          <a href="#about__us">
            <Button className="hero__button">Know about our club leader</Button>
          </a>
        </div>
      </div>
      <Gallery />
      <OurTeam />
      <About />
      <Footer />
    </div>
  );
}

export default HomeScreen;
