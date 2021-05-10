import React, { useContext } from "react";
import { UserContext } from "./UserProvider.js";



export const LanguageContext = React.createContext();

export const LanguageProvider = (props) => {
    const { getToken } = useContext(UserContext);
    const apiUrl = "/api/Language";



    const getUserLanguages = () => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/GetByUser`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
        )
    };



    const getLanguageById = (languageId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/GetLanguageByLanguageId/${languageId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
        )
    }



    const addLanguage = (language) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/Create`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(language),
            })
        )
    };



    const editLanguage = (language) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/Edit/${language.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(language),
            })
        )
    };



    const deleteLanguage = (languageId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/Delete/${languageId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
    };



    return (
        <LanguageContext.Provider value={{
            getUserLanguages, getLanguageById, addLanguage,
            editLanguage, deleteLanguage
        }}>
            {props.children}
        </LanguageContext.Provider>
    );
};