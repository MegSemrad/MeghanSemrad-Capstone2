import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import { LanguageProvider } from "../providers/LanguageProvider.js";
import { LanguageProficiencyProvider } from "../providers/LanguageProficiencyProvider";
import { FlashcardCollectionProvider } from "../providers/FlashcardCollectionProvider";
import LanguageList from "./Languages/LanguageList.js";
import LanguageAdd from "./Languages/LanguageAdd";
import FlashcardCollectionList from "./FlashcardCollections/FlashcardCollectionList";

export default function ApplicationViews() {

    const { isLoggedIn } = useContext(UserContext);

    return (
        <main>

            <Route path="/" exact>
                <LanguageProvider>
                    {isLoggedIn ? <LanguageList /> : <Redirect to="/login" />}
                </LanguageProvider>
            </Route>
            <Route path="/AddLanguage" >
                <LanguageProvider>
                    <LanguageProficiencyProvider>
                        {isLoggedIn ? <LanguageAdd /> : <Redirect to="/login" />}
                    </LanguageProficiencyProvider>
                </LanguageProvider>
            </Route>


            <Route path="/LanguageTopicList" >
                <FlashcardCollectionProvider>
                    <LanguageProvider>
                        <FlashcardCollectionList />
                    </LanguageProvider>
                </FlashcardCollectionProvider>
            </Route>

        </main>
    );
};