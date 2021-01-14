import React from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>
        false ? children : <Redirect to={{ pathname: "/login" }} />
      }
    />
  );
}

export default PrivateRoute;
