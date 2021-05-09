import React, { useState, useContext } from "react";
import { UserContext } from "./UserProvider.js";



export const ResourceContext = React.createContext();

export const ResourceProvider = (props) => {
    const [resources, setResources] = useState([]);
    const { getToken } = useContext(UserContext);
    const user = JSON.parse(sessionStorage.getItem("user"));
    const apiUrl = "/api/Resource";





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





    const addResource = (resource) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/CreateResource`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(resource),
            })
        )
    };





    const deleteResource = (resourceId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/Delete/${resourceId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
    };





    return (
        <ResourceContext.Provider value={{
            resources, getResourcesByLanguageId, addResource, deleteResource
        }}>
            {props.children}
        </ResourceContext.Provider>
    );
};