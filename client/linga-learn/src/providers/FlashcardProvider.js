import React, { useState, useContext } from "react";
import { UserContext } from "./UserProvider.js";



export const FlashcardContext = React.createContext();

export const FlashcardProvider = (props) => {
    const [flashcards, setFlashcards] = useState([]);
    const { getToken } = useContext(UserContext);
    const user = JSON.parse(sessionStorage.getItem("user"));
    const apiUrl = "/api/Flashcard";



    const getFlashcardsByCollectionId = (FlashcardCollectionId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/GetFlashcardsByCollection/${FlashcardCollectionId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
        )
    };





    const deleteSingleFlashcard = (flashcardId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/Delete/${flashcardId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
    };





    return (
        <FlashcardContext.Provider value={{
            flashcards, getFlashcardsByCollectionId, deleteSingleFlashcard
        }}>
            {props.children}
        </FlashcardContext.Provider>
    );

};