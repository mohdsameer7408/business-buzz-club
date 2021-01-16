import React from "react";

import "../assets/css/EventsScreen.css";
import Event from "../components/Event";

function EventsScreen() {
  return (
    <div className="events__screen">
      <h1 className="events__title">Our Events</h1>
      <Event />
      <Event />
      <Event />
    </div>
  );
}

export default EventsScreen;
