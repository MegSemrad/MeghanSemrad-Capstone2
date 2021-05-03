import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import { LanguageProvider } from "../providers/LanguageProvider.js";
import LanguageList from "./Languages/LanguageList.js";

export default function ApplicationViews() {

    const { isLoggedIn } = useContext(UserContext);

    return (
        <main>
            <Route path="/" exact>
                <LanguageProvider>
                    {isLoggedIn ? <LanguageList /> : <Redirect to="/login" />}
                </LanguageProvider>
            </Route>
        </main >

    );
};