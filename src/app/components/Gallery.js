import React, { useEffect, useState } from "react";

import "../assets/css/Gallery.css";

function Gallery() {
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
        {Array(6)
          .fill()
          .map((_, index) => (
            <div
              style={{ margin: isGalleryReached ? "20px" : 0 }}
              key={index}
              className="image__cardWrapper"
            >
              <div
                style={{
                  backgroundImage: `url("https://picsum.photos/400/500")`,
                }}
                className="image__card"
              >
                <div className="image__description">
                  <h1>Title</h1>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sunt laboriosam voluptatibus aliquid.
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
