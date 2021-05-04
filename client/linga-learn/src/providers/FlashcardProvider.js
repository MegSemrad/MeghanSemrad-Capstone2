import React, { useState, useContext } from "react";
import { UserContext } from "./UserProvider.js";



export const FlashcardContext = React.createContext();

export const FlashcardProvider = (props) => {
    const [flashcards, setFlashcards] = useState([]);
    const { getToken } = useContext(UserContext);
    const user = JSON.parse(sessionStorage.getItem("user"));
    const apiUrl = "/api/Flashcard";



    const GetFlashcardsByCollectionId = (FlashcardCollectionId) => {
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





    return (
        <FlashcardContext.Provider value={{
            flashcards, GetFlashcardsByCollectionId
        }}>
            {props.children}
        </FlashcardContext.Provider>
    );

};