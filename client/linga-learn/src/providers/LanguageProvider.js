import React, { useState, useContext } from "react";
import { UserContext } from "./UserProvider.js";



export const LanguageContext = React.createContext();

export const LanguageProvider = (props) => {
    const [languages, setLanguages] = useState([]);
    const { getToken } = useContext(UserContext);
    const user = JSON.parse(sessionStorage.getItem("user"));
    const apiUrl = "/api/category";



    const GetUserLanguages = () => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/GetByUser/${user.id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then(setLanguages));
    };





    const AddLanguage = (language) => {
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






    const EditLanguage = (language) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/Edit/${languageId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(language),
            })
        )
    };





    const DeleteLanguage = (languageId) => {
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
            languages, GetUserLanguages, AddLanguage,
            EditLanguage, DeleteLanguage
        }}>
            {props.children}
        </LanguageContext.Provider>
    );
};