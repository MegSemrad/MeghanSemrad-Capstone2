import React, { useState, useContext } from "react";
import { UserContext } from "./UserProvider.js";



export const LanguageProficiencyContext = React.createContext();

export const LanguageProficiencyProvider = (props) => {
    const [languageProficiencies, setLanguageProficiencies] = useState([]);
    const { getToken } = useContext(UserContext);
    const user = JSON.parse(sessionStorage.getItem("user"));
    const apiUrl = "/api/LanguageProficiency";



    const GetLanguageProficiencies = () => {
        return getToken().then((token) =>
            fetch(`${apiUrl}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
        )
    };



    return (
        <LanguageProficiencyContext.Provider value={{
            languageProficiencies, GetLanguageProficiencies
        }}>
            {props.children}
        </LanguageProficiencyContext.Provider>
    );
};