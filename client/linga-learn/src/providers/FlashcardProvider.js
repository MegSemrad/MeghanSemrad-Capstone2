import React, { useState, useContext } from "react";
import { UserContext } from "./UserProvider.js";



export const FlashcardContext = React.createContext();

export const FlashcardProvider = (props) => {
    const [flashcards, setFlashcards] = useState([]);
    const { getToken } = useContext(UserContext);
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
                .then((res) => setFlashcards(res))
        )
    };



    const getFlashcardById = (FlashcardId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/GetFlashcardByFlashcardId/${FlashcardId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
        )
    };



    const addFlashcard = (flashcard) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/Create`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(flashcard),
            })
                .then((res) => res.json())
                .then((flashcard) => {
                    getFlashcardsByCollectionId(flashcard.flashcardCollectionId)
                })
        )
    };



    const editFlashcard = (flashcard) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/Edit/${flashcard.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(flashcard),
            })
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
            flashcards, getFlashcardsByCollectionId, getFlashcardById,
            addFlashcard, editFlashcard, deleteSingleFlashcard
        }}>
            {props.children}
        </FlashcardContext.Provider>
    );
};