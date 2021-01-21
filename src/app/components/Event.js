import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import moment from "moment";
import { useHistory } from "react-router-dom";

import "../assets/css/Event.css";
import { selectUser } from "../features/authSlice";
import { db } from "../features/firebase";

function Event({ eventData }) {
  const user = useSelector(selectUser);
  const history = useHistory();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("events")
      .doc(eventData.id)
      .collection("participants")
      .onSnapshot((snapshot) =>
        setParticipants(snapshot.docs.map((doc) => doc.id))
      );

    return unsubscribe;
  }, [eventData.id]);

  const enrollInEventHandler = (event) => {
    event.preventDefault();
    db.collection("events")
      .doc(eventData.id)
      .collection("participants")
      .doc(user.uid)
      .set(user);
  };

  const editEvent = () => {
    history.push(`/event/edit/${eventData.id}`);
  };

  const deleteEvent = () => {
    db.collection("events").doc(eventData.id).delete();
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
          {moment(new Date(eventData.dateTime)).format("MMM Do YYYY, HH:mm")}
        </span>
        <a href={eventData.meetUrl} target="_blank" rel="noreferrer">
          Google Meet Url
        </a>
        {user?.type.toLowerCase() === "admin" && (
          <div className="event__configButtons">
            <Button className="hero__button" onClick={editEvent}>
              Edit
            </Button>
            <Button className="hero__button" onClick={deleteEvent}>
              Delete
            </Button>
          </div>
        )}
        <Button
          className="hero__button register__now"
          disabled={
            user
              ? new Date(eventData.dateTime) > new Date()
                ? participants.some((participant) => participant === user.uid)
                  ? true
                  : false
                : true
              : true
          }
          onClick={enrollInEventHandler}
        >
          {user
            ? new Date(eventData.dateTime) > new Date()
              ? participants.some((participant) => participant === user.uid)
                ? "You have registered"
                : "Register Now"
              : "Registrations are over"
            : "Sign In to register"}
        </Button>
      </div>
    </div>
  );
}

export default Event;
