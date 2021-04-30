import React, { useContext } from 'react';
import { UserProvider } from "../providers/UserProvider";
import ApplicationViews from "./ApplicationViews";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import Login from "./login.js";
import Register from "./register.js";
import NavBar from "../components/NavBar.js";





function LingaLearn(props) {

  const { isLoggedIn } = useContext(UserContext);

  return (
    <>
      <UserProvider>
        <Route>
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
      </UserProvider>
    </>
  )
};


export default LingaLearn;