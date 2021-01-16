import React from "react";

import "../assets/css/About.css";

function About() {
  return (
    <div id="about__us" className="about">
      {Array(3)
        .fill()
        .map((_, index) => (
          <div key={index} className="about_container">
            <div className="right">
              <img
                className="img_about"
                src="https://images.pexels.com/photos/2763927/pexels-photo-2763927.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt=""
              />
            </div>
            <div className="left">
              <h1>About Us</h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Expedita voluptatem praesentium exercitationem eligendi dolores
                quibusdam porro ab quia, placeat alias iste totam pariatur cum
                recusandae illum et nemo quaerat. Delectus distinctio aliquid,
                velit illum voluptates vel itaque mollitia consequuntur debitis?
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default About;
