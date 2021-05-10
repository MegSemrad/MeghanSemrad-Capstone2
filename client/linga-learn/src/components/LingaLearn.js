import React, { useContext } from 'react';
import { Route, Redirect } from "react-router-dom";
import Login from "./login.js";
import Register from "./register.js";
import NavBar from "../components/NavBar.js";
import ApplicationViews from "./ApplicationViews";
import { UserContext } from "../providers/UserProvider";



function LingaLearn(props) {

  const { isLoggedIn } = useContext(UserContext);

  return (
    <>
      <Route path="/">
        {isLoggedIn ?
          <>
            <NavBar />
            <ApplicationViews />
          </>
          : <Redirect to="/login" />
        }
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/register">
        <Register />
      </Route>
    </>
  )
};


export default LingaLearn;