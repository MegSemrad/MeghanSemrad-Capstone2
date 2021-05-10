import React, { useContext } from "react";
import { UserContext } from "./UserProvider.js";



export const ResourceTypeContext = React.createContext();

export const ResourceTypeProvider = (props) => {
    const { getToken } = useContext(UserContext);
    const apiUrl = "/api/ResourceType";



    const getResourceTypes = () => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/GetResourceTypes`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
        )
    };



    return (
        <ResourceTypeContext.Provider value={{
            getResourceTypes
        }}>
            {props.children}
        </ResourceTypeContext.Provider>
    );
};