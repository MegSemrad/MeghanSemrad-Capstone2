import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { UserContext } from "../providers/UserProvider";

import { LanguageProvider } from "../providers/LanguageProvider.js";
import { LanguageProficiencyProvider } from "../providers/LanguageProficiencyProvider.js";
import { FlashcardCollectionProvider } from "../providers/FlashcardCollectionProvider.js";
import { FlashcardProvider } from "../providers/FlashcardProvider.js";
import { ResourceProvider } from "../providers/ResourceProvider.js";
import { ResourceTypeProvider } from "../providers/ResourceTypeProvider.js";

import LanguageList from "./Languages/LanguageList.js";
import LanguageAdd from "./Languages/LanguageAdd.js";
import LanguageEdit from "./Languages/LanguageEdit.js";
import LanguageDeletionConfirmation from "./Languages/LanguageDeletionConfirmation.js";
import FlashcardCollectionList from "./FlashcardCollections/FlashcardCollectionList";
import FlashcardCollectionAndFlashcardAdd from "./FlashcardCollections/FlashcardCollectionAndFlashcardAdd.js";
import FlashcardCollectionDeletionConfirmation from "./FlashcardCollections/FlashcardDeletionConfirmation.js";
import FlashcardList from "./Flashcards/FlashcardList.js";
import FlashcardEdit from "./Flashcards/FlashcardEdit.js";
import ResourceList from "./Resources/ResourceList.js";
import ResourceAdd from "./Resources/ResourceAdd.js";
import ResourceEdit from "./Resources/ResourceEdit.js";



export default function ApplicationViews() {

    const { isLoggedIn } = useContext(UserContext);

    return (
        <main>

            <LanguageProvider>
                <LanguageProficiencyProvider>

                    <Route path="/" exact>
                        {isLoggedIn ? <LanguageList /> : <Redirect to="/login" />}
                    </Route>

                    <Route path="/AddLanguage" exact>
                        {isLoggedIn ? <LanguageAdd /> : <Redirect to="/login" />}
                    </Route>

                    <Route path="/EditLanguage/:languageId(\d+)" exact>
                        {isLoggedIn ? <LanguageEdit /> : <Redirect to="/login" />}
                    </Route>

                    <Route path="/DeleteLanguage/:languageId(\d+)" exact>
                        {isLoggedIn ? <LanguageDeletionConfirmation /> : <Redirect to="/login" />}
                    </Route>

                </LanguageProficiencyProvider>
            </LanguageProvider>





            <FlashcardCollectionProvider>
                <FlashcardProvider>
                    <LanguageProvider>

                        <Route path="/FlashcardCollectionList" >
                            {isLoggedIn ? <FlashcardCollectionList /> : <Redirect to="/login" />}
                        </Route>

                        <Route path="/FlashcardList/:FlashcardCollectionId(\d+)" >
                            {isLoggedIn ? <FlashcardList /> : <Redirect to="/login" />}
                        </Route>

                        <Route path="/AddFlashcardCollectionAndFlashcards" >
                            {isLoggedIn ? <FlashcardCollectionAndFlashcardAdd /> : <Redirect to="/login" />}
                        </Route>

                        <Route path="/Delete/:FlashcardCollectionId(\d+)" >
                            {isLoggedIn ? <FlashcardCollectionDeletionConfirmation /> : <Redirect to="/login" />}
                        </Route>

                        <Route path="/Manage/:FlashcardId(\d+)">
                            {isLoggedIn ? <FlashcardEdit /> : <Redirect to="/login" />}
                        </Route>

                    </LanguageProvider>
                </FlashcardProvider>
            </FlashcardCollectionProvider>





            <ResourceTypeProvider>
                <LanguageProvider>
                    <ResourceProvider>

                        <Route path="/resources">
                            {isLoggedIn ? <ResourceList /> : <Redirect to="/login" />}
                        </Route>

                        <Route path="/AddResources/:LanguageId(\d+)">
                            {isLoggedIn ? <ResourceAdd /> : <Redirect to="/login" />}
                        </Route>

                        <Route path="/EditResource/:ResourceId(\d+)">
                            {isLoggedIn ? <ResourceEdit /> : <Redirect to="/login" />}
                        </Route>

                    </ResourceProvider>
                </LanguageProvider>
            </ResourceTypeProvider>

        </main>
    );
};