import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { UserContext } from "../providers/UserProvider";

import { LanguageProvider } from "../providers/LanguageProvider.js";
import { LanguageProficiencyProvider } from "../providers/LanguageProficiencyProvider.js";
import { FlashcardCollectionProvider } from "../providers/FlashcardCollectionProvider.js";
import { FlashcardProvider } from "../providers/FlashcardProvider.js"

import LanguageList from "./Languages/LanguageList.js";
import LanguageAdd from "./Languages/LanguageAdd.js";
import FlashcardCollectionList from "./FlashcardCollections/FlashcardCollectionList";
import FlashcardList from "./Flashcards/FlashcardList.js"
import FlashcardCollectionAndFlashcardAdd from "./FlashcardCollections/FlashcardCollectionAndFlashcardAdd.js"



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


            <Route path="/FlashcardCollectionList" >
                <FlashcardCollectionProvider>
                    <LanguageProvider>
                        {isLoggedIn ? <FlashcardCollectionList /> : <Redirect to="/login" />}
                    </LanguageProvider>
                </FlashcardCollectionProvider>
            </Route>


            <Route path="/FlashcardList/:FlashcardCollectionId(\d+)" >
                <FlashcardProvider>
                    {isLoggedIn ? <FlashcardList /> : <Redirect to="/login" />}
                </FlashcardProvider>
            </Route>

            <Route path="/AddFlashcardCollectionAndFlashcards" >
                <FlashcardCollectionProvider>
                    <FlashcardProvider>
                        {isLoggedIn ? <FlashcardCollectionAndFlashcardAdd /> : <Redirect to="/login" />}
                    </FlashcardProvider>
                </FlashcardCollectionProvider>
            </Route>

        </main>
    );
};