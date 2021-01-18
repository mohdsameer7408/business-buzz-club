import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => (false ? <Redirect to={{ pathname: "/" }} /> : children)}
    />
  );
}

export default ProtectedRoute;
