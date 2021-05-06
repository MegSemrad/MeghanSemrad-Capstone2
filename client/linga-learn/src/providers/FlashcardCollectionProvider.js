import React, { useState, useContext } from "react";
import { UserContext } from "./UserProvider.js";



export const FlashcardCollectionContext = React.createContext();

export const FlashcardCollectionProvider = (props) => {
    const [flashcardCollections, setFlashcardCollections] = useState([]);
    const [flashcardCollection, setFlashcardCollection] = useState({});
    const { getToken } = useContext(UserContext);
    const user = JSON.parse(sessionStorage.getItem("user"));
    const apiUrl = "/api/FlashcardCollection";



    const GetUserFlashcardCollections = () => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/GetFlashcardCollectionsByUser`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
        )
    };





    const addFlashcardCollection = (flashcardCollection) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/Create`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(flashcardCollection),
            })
                .then(res => res.json())
                .then((returnedFlashcardCollectionObject) => {
                    setFlashcardCollection(returnedFlashcardCollectionObject)
                })
        )
    };





    const deleteFlashcardCollection = (flashcardCollectionId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/Delete/${flashcardCollectionId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(flashcardCollectionId),
            })
        )
    }





    return (
        <FlashcardCollectionContext.Provider value={{
            flashcardCollections, flashcardCollection, GetUserFlashcardCollections, addFlashcardCollection, deleteFlashcardCollection
        }}>
            {props.children}
        </FlashcardCollectionContext.Provider>
    );

};