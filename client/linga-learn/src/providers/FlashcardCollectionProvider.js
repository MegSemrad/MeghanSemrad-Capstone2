import React, { useState, useContext } from "react";
import { UserContext } from "./UserProvider.js";



export const FlashcardCollectionContext = React.createContext();

export const FlashcardCollectionProvider = (props) => {
    const [flashcardCollections, setFlashcardCollections] = useState([]);
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





    return (
        <FlashcardCollectionContext.Provider value={{
            flashcardCollections, GetUserFlashcardCollections
        }}>
            {props.children}
        </FlashcardCollectionContext.Provider>
    );

};