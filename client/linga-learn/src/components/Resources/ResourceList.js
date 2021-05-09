
// need a way to add first resources for a new language!!!!
//get list of languages by userid 
//populated page with those
//onClick on a language get resources by language id 


import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { LanguageContext } from "../../providers/LanguageProvider.js";
import { ResourceContext } from "../../providers/ResourceProvider.js";
import Resource from "./Resource.js";
import { Button, Container, Table } from 'reactstrap';


const ResourcesList = (props) => {
    const history = useHistory();
    const { GetUserLanguages } = useContext(LanguageContext);
    const { getResourcesByLanguageId } = useContext(ResourceContext)

    const [languages, setLanguages] = useState([]);
    const [resources, setResources] = useState([]);

    useEffect(() => {
        GetUserLanguages()
            .then(resp => setLanguages(resp))
    }, []);

    const handleSaveSelectedLanguage = (language) => {
        getResourcesByLanguageId(language.id)
            .then(returnedResources => setResources(returnedResources))
    };



    // const handleEditResource
    // const handleDeleteResource


    return (
        <>
            <Container>
                {
                    languages.map(language => {
                        return <Button outline key={language.id}
                            onClick={event => {
                                event.preventDefault()
                                handleSaveSelectedLanguage(language)
                            }}>{language.languageName}</Button>
                    })
                }
            </Container>

            <Table borderless>
                {
                    resources.map(resource => {
                        return <Resource key={resource.id}
                            resource={resource}
                        />
                    })
                }
            </Table>
        </>
    );
};


export default ResourcesList;