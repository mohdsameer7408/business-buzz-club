import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "../assets/css/Gallery.css";
import { selectEvents } from "../features/eventsSlice";

function Gallery() {
  const prevEvents = [...useSelector(selectEvents)].reverse().slice(0, 6);
  const [isGalleryReached, setIsGalleryReached] = useState(false);

  useEffect(() => {
    const addMargin = () => {
      if (window.scrollY > 500 && window.scrollY < 1500) {
        setIsGalleryReached(true);
      } else if (window.scrollY > 1500) {
        setIsGalleryReached(false);
      } else {
        setIsGalleryReached(false);
      }
    };

    window.addEventListener("scroll", addMargin);

    return () => {
      window.removeEventListener("scroll", addMargin);
    };
  }, []);

  return (
    <div className="gallery">
      <div className="gallery__heading">
        <h1 className="main__heading">Our Previous Events</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis sunt
          laborum quo facilis esse velit quia optio obcaecati qui voluptatum.
        </p>
      </div>
      <div className="image__cards">
        {prevEvents.map((event) => (
          <div
            style={{ margin: isGalleryReached ? "20px" : 0 }}
            key={event.id}
            className="image__cardWrapper"
          >
            <div
              style={{
                backgroundImage: `url(${event.poster})`,
              }}
              className="image__card"
            >
              <div className="image__description">
                <h1>{event.title}</h1>
                <p>
                  {event.description.length > 200
                    ? `${event.description.slice(0, 200)}...`
                    : event.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
