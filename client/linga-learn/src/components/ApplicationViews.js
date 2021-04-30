import React from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./login";
import Register from "./register";

export default function ApplicationViews() {

    return (
        <main>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </main >

    );
};