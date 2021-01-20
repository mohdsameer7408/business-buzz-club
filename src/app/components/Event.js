import React from "react";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import moment from "moment";

import "../assets/css/Event.css";
import { selectUser } from "../features/authSlice";

function Event({ eventData }) {
  const user = useSelector(selectUser);

  const enrollInEventHandler = (event) => {
    event.preventDefault();
    console.log("Enrolled");
  };

  return (
    <div
      className="event"
      style={{
        background: `rgba(0, 0, 0, 0.7) url(${eventData.poster}) center/cover fixed no-repeat`,
      }}
    >
      <div className="event__poster">
        <img src={eventData.poster} alt="poster" />
      </div>
      <div className="event__details">
        <h2 className="event__title">{eventData.title}</h2>
        <p className="event_description">{eventData.description}</p>
        <span>
          Date and time -{" "}
          {moment(eventData.dateTime).format("MMM Do YYYY, HH:mm")}
        </span>
        <a href={eventData.meetUrl} target="_blank" rel="noreferrer">
          Google Meet Url
        </a>
        {user?.type.toLowerCase() === "admin" && (
          <div className="event__configButtons">
            <Button className="hero__button">Edit</Button>
            <Button className="hero__button">Delete</Button>
          </div>
        )}
        <Button
          className="hero__button register__now"
          disabled={
            user
              ? eventData.dateTime > new Date().toString()
                ? false
                : true
              : true
          }
          onClick={enrollInEventHandler}
        >
          {user
            ? eventData.dateTime > new Date().toString()
              ? "Register Now"
              : "Registrations are over"
            : "Sign In to register"}
        </Button>
      </div>
    </div>
  );
}

export default Event;
