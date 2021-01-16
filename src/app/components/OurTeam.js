import React from "react";

import "../assets/css/OurTeam.css";

function OurTeam() {
  return (
    <div className="ourTeam">
      <div className="ourTeam__heading">
        <h1>Our Team</h1>
      </div>
      <div className="profile__container">
        {Array(3)
          .fill()
          .map((_, index) => (
            <div key={index} className="ourTeam__profile">
              <img
                className="ourTeam__image"
                src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
                alt=""
              />
              <h2>Harshit harami</h2>
              <p>Founder of Srijan club</p>
              <p className="team__text">
                Lorem ipsum, dolor sit amet consectetur adipisicing
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default OurTeam;
