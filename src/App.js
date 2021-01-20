import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./App.css";
import Header from "./app/components/Header";
import HomeScreen from "./app/screens/HomeScreen";
import EventsScreen from "./app/screens/EventsScreen";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import AddEvent from "./app/screens/AddEvent";
import PrivateRoute from "./app/components/PrivateRoute";
import ProtectedRoute from "./app/components/ProtectedRoute";
import { auth, db } from "./app/features/firebase";
import { signIn, signOutAsync } from "./app/features/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribe;
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        unsubscribe = db
          .collection("users")
          .doc(authUser.uid)
          .onSnapshot((doc) => dispatch(signIn(doc.data())));
        // dispatch(signInAsync(authUser)).catch((error) => alert(error));
      } else {
        dispatch(signOutAsync()).catch((error) => alert(error));
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <PrivateRoute path="/event/create">
            <AddEvent />
          </PrivateRoute>
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
