import React from "react";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";

import "../assets/css/EventsScreen.css";
import Event from "../components/Event";
import { selectUser } from "../features/authSlice";
import { useHistory } from "react-router-dom";
import { selectEvents } from "../features/eventsSlice";

function EventsScreen() {
  const events = useSelector(selectEvents);
  const user = useSelector(selectUser);
  const history = useHistory();

  return (
    <div className="events__screen">
      <h1 className="events__title">Our Events</h1>
      {user?.type.toLowerCase() === "admin" && (
        <Button onClick={() => history.push("/event/create")}>
          Add An Event
        </Button>
      )}
      {events.map((event) => (
        <Event key={event.id} eventData={event} />
      ))}
    </div>
  );
}

export default EventsScreen;
