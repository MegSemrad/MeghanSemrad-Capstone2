import React, { useContext, useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { LanguageContext } from "../../providers/LanguageProvider";
import { ResourceTypeContext } from "../../providers/ResourceTypeProvider.js";
import { ResourceContext } from "../../providers/ResourceProvider.js";
import { Button, Card, Container, Form, FormGroup, Input, Label } from 'reactstrap';


const ResourceAdd = (props) => {
    const history = useHistory();
    const { getLanguageById } = useContext(LanguageContext);
    const { getResourceTypes } = useContext(ResourceTypeContext);
    const { getResourcesByLanguageId, addResource } = useContext(ResourceContext);
    const { LanguageId } = useParams();


    const [language, setLanguage] = useState({});
    const [resourceTypes, setResourceTypes] = useState([]);
    const [resourcesArray, setResourcesArray] = useState([]);
    const [resource, setResource] = useState({
        resourceTypeId: 0,
        languageId: LanguageId,
        source: "",
    });


    useEffect(() => {
        getResourcesByLanguageId(LanguageId)
            .then(resourcesArray => setResourcesArray(resourcesArray))
    }, []);


    useEffect(() => {
        getLanguageById(LanguageId)
            .then(languageObject => setLanguage(languageObject))
        getResourceTypes()
            .then(resourceTypeArray => setResourceTypes(resourceTypeArray))
    }, []);


    const handleControlledInputChange = (event) => {
        const newResource = { ...resource }
        newResource[event.target.id] = event.target.value
        setResource(newResource)
    }

    const handleClickAddResource = () => {
        addResource({
            resourceTypeId: resource.resourceTypeId,
            languageId: resource.languageId,
            source: resource.source,
        })
            .then(() => {
                setResource({
                    resourceTypeId: 0,
                    source: "",
                    languageId: LanguageId,
                })
            })
    };


    return (
        <>
            {
                resourcesArray.length === 0 ?
                    <Label className="resourceAddLabel">Looks like you have no resources for {language.languageName}. Add some now!</Label>
                    :
                    <Label className="resourceAddLabel">Add more resources for {language.languageName}</Label>
            }

            <Container className="addResourceContainer">
                <Card className="addResourceCard">
                    <Form>

                        <FormGroup className="addResourceForm">
                            <Label for="resourceTypeId">Resource Type</Label>
                            <Input type="select" id="resourceTypeId" onChange={handleControlledInputChange}>
                                <option value="0"></option>
                                {
                                    resourceTypes.map(resourceType => {
                                        return (
                                            <>
                                                <option key={resourceType.id} value={resourceType.id}>
                                                    {resourceType.type}
                                                </option>
                                            </>
                                        )
                                    })
                                }
                            </Input>
                        </FormGroup>

                        <FormGroup className="addResourceForm">
                            <Label for="source">Resource</Label>
                            <Input type="text"
                                onChange={handleControlledInputChange}
                                requiredAutoClassName="form-control"
                                name="source"
                                id="source"
                                value={resource.source} />
                        </FormGroup>

                        <Button className="addResourceForm" onClick={handleClickAddResource}>Add</Button>

                        <Button className="addResourceForm" onClick={event => {
                            event.preventDefault()
                            history.push(`/resources`)
                        }}>View Resources</Button>

                    </Form>
                </Card>
            </Container>
        </>
    );
};

export default ResourceAdd;