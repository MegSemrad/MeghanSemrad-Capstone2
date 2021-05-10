import React, { useContext } from "react";
import { UserContext } from "./UserProvider.js";



export const LanguageProficiencyContext = React.createContext();

export const LanguageProficiencyProvider = (props) => {
    const { getToken } = useContext(UserContext);
    const apiUrl = "/api/LanguageProficiency";



    const getLanguageProficiencies = () => {
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
            getLanguageProficiencies
        }}>
            {props.children}
        </LanguageProficiencyContext.Provider>
    );
};