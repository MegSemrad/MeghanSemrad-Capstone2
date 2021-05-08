import React, { useState, useContext } from "react";
import { UserContext } from "./UserProvider.js";



export const ResourceContext = React.createContext();

export const LanguageProvider = (props) => {
    const [resources, setResources] = useState([]);
    const { getToken } = useContext(UserContext);
    const user = JSON.parse(sessionStorage.getItem("user"));
    const apiUrl = "/api/Resources";





    const getResourcesByLanguageId = (languageId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/GetResourcesByLanguageId/${languageId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
        )
    }





    return (
        <ResourceContext.Provider value={{
            resources, getResourcesByLanguageId
        }}>
            {props.children}
        </ResourceContext.Provider>
    );
};