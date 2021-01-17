import React from "react";
import { Button } from "@material-ui/core";

import "../assets/css/Event.css";

function Event() {
  return (
    <div className="event">
      <div className="event__poster">
        <img src="https://picsum.photos/400/500" alt="poster" />
      </div>
      <div className="event__details">
        <h2 className="event__title">TALES THROUGH LENS</h2>
        <p className="event_description">
          📸SNAPSHOT Club is organising it's WEBINAR on "TALES THROUGH LENS"📸
          REGISTERATION LINK https://forms.gle/ksTdidbaZQuUKn9N7 The guest who
          will be conducting the session is Mr. NAMAN SRIVASATAVA FIND YOUR
          ANSWER Where you get a chance to ask any question to our guest and get
          your solution! Your question can be related to -PHOTOGRAPHY
          /CINEMATOGRAPHY Date. 05 JANUARY, 2021 *Time. 6.00pm * ▶️Visit
          snapshot club on instagram-
          https://instagram.com/snapshotclub_srmu?igshid=1uuy20izikpuc ▶️Catch
          us on facebook-
          https://m.facebook.com/Snapshot-Club-SRMU-102959565048412/ Join the
          session through the link below! https://meet.google.com/xgj-rncx-vmz
          Faculty coordinators- Mohd.Yunus-9307773924 Ashutosh seth-8850084082
          Any querry contact - Student Coordinators Surbhi pandey- 70337 41517
          Himanshu chaudhari- 7408135502 Aanchal singh-9794409011 Ashutosh
          mishra- 7905414748 Pradisha vishwakarma- 8840109696 Swarnim dwivedi-
          9664479419
        </p>
        <span>Date and time - {new Date().toUTCString()}</span>
        <a href="https://meet.google.com" target="_blank" rel="noreferrer">
          Google Meet Url
        </a>
        <Button className="hero__button register__now" disabled={false}>
          Register Now
        </Button>
      </div>
    </div>
  );
}

export default Event;
