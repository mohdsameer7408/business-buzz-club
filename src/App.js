import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Header from "./app/components/Header";
import HomeScreen from "./app/screens/HomeScreen";
import EventsScreen from "./app/screens/EventsScreen";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import PrivateRoute from "./app/components/PrivateRoute";
import ProtectedRoute from "./app/components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <PrivateRoute path="/profile">
            <ProfileScreen />
          </PrivateRoute>
          <ProtectedRoute path="/login">
            <LoginScreen />
          </ProtectedRoute>
          <ProtectedRoute path="/register">
            <RegisterScreen />
          </ProtectedRoute>
          <Route path="/events">
            <EventsScreen />
          </Route>
          <Route path="/">
            <HomeScreen />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
