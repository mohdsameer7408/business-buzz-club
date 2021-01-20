import React from "react";

import "../assets/css/LoadingSpinner.css";

function LoadingSpinner({ large }) {
  return <div className={`spinner ${large && "spinner__large"}`}></div>;
}

export default LoadingSpinner;
