import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";

import "../assets/css/EventsScreen.css";
import Event from "../components/Event";
import { selectUser } from "../features/authSlice";
import { useHistory } from "react-router-dom";
import { db } from "../features/firebase";

function EventsScreen() {
  const [events, setEvents] = useState([]);
  const user = useSelector(selectUser);
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = db
      .collection("events")
      .orderBy("dateTime", "desc")
      .onSnapshot((snapshot) =>
        setEvents(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      );

    return unsubscribe;
  }, []);

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
