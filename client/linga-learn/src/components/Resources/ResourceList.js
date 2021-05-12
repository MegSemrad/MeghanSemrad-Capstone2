import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { LanguageContext } from "../../providers/LanguageProvider.js";
import { ResourceContext } from "../../providers/ResourceProvider.js";
import Resource from "./Resource.js";
import { Button, Container, Label, Table } from 'reactstrap';


const ResourcesList = (props) => {
    const history = useHistory();
    const { getUserLanguages } = useContext(LanguageContext);
    const { getResourcesByLanguageId, deleteResource } = useContext(ResourceContext)

    const [languages, setLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState({});
    const [resources, setResources] = useState([]);
    const [onlineResources, setOnlineResources] = useState([]);
    const [videoResources, setVideoResources] = useState([]);
    const [radioResources, setRadioResources] = useState([]);
    const [bookResources, setBookResources] = useState([]);
    const [textbookResources, setTextbookResources] = useState([]);
    const [otherResources, setOtherResources] = useState([]);


    useEffect(() => {
        getUserLanguages()
            .then(resp => setLanguages(resp))
    }, []);


    const handleSaveSelectedLanguage = (language) => {
        getResourcesByLanguageId(language.id)
            .then((returnedResources) => {
                returnedResources.length === 0 ? history.push(`/AddResources/${language.id}`)
                    : setResources(returnedResources)
            })
    };


    useEffect(() => {
        const onlineResource = resources.filter(r => r.resourceTypeId === 1)
        setOnlineResources(onlineResource)

        const videoResource = resources.filter(r => r.resourceTypeId === 2)
        setVideoResources(videoResource)

        const radioResource = resources.filter(r => r.resourceTypeId === 3)
        setRadioResources(radioResource)

        const bookResource = resources.filter(r => r.resourceTypeId === 4)
        setBookResources(bookResource)

        const textbookResource = resources.filter(r => r.resourceTypeId === 5)
        setTextbookResources(textbookResource)

        const otherResource = resources.filter(r => r.resourceTypeId === 6)
        setOtherResources(otherResource)
    }, [resources]);




    const handleDeleteResource = (resource) => {
        const resourceLanguageId = resource.languageId
        deleteResource(resource.id)
            .then(() => {
                getResourcesByLanguageId(resourceLanguageId)
                    .then(returnedResources => setResources(returnedResources))
            })
    }


    return (
        <>
            <Container className="languageResourceButtonContainer">
                {
                    languages.map(language => {
                        return <Button
                            outline
                            key={language.id}
                            className="languageResourceButton"
                            onClick={event => {
                                event.preventDefault()
                                setSelectedLanguage(language)
                                handleSaveSelectedLanguage(language)
                            }}>{language.languageName}</Button>
                    })
                }
            </Container>

            <Container>
                {
                    resources.length === 0 ?
                        <Label className="resourceWelcomeLabel">Welcome to the resources page!</Label>
                        :
                        <>
                            <Container className="resourcesContainerWithAddButton">
                                <Button outline onClick={event => {
                                    event.preventDefault()
                                    history.push(`/AddResources/${selectedLanguage.id}`)
                                }}>+</Button>
                                <Table borderless>
                                    <thead>
                                        <tr>
                                            <th>Online</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    {
                                        onlineResources.map(onlineResource => {
                                            return <Resource key={onlineResource.id}
                                                resource={onlineResource}
                                                handleDeleteResource={handleDeleteResource}
                                            />
                                        })
                                    }

                                    <thead>
                                        <tr>
                                            <th>Videos</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    {
                                        videoResources.map(videoResource => {
                                            return <Resource key={videoResource.id}
                                                resource={videoResource}
                                                handleDeleteResource={handleDeleteResource}
                                            />
                                        })
                                    }

                                    <thead>
                                        <tr>
                                            <th>Radio</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    {
                                        radioResources.map(radioResource => {
                                            return <Resource key={radioResource.id}
                                                resource={radioResource}
                                                handleDeleteResource={handleDeleteResource}
                                            />
                                        })
                                    }

                                    <thead>
                                        <tr>
                                            <th>Books</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    {
                                        bookResources.map(bookResource => {
                                            return <Resource key={bookResource.id}
                                                resource={bookResource}
                                                handleDeleteResource={handleDeleteResource}
                                            />
                                        })
                                    }

                                    <thead>
                                        <tr>
                                            <th>Textbooks</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    {
                                        textbookResources.map(textbookResource => {
                                            return <Resource key={textbookResource.id}
                                                resource={textbookResource}
                                                handleDeleteResource={handleDeleteResource}
                                            />
                                        })
                                    }

                                    <thead>
                                        <tr>
                                            <th>Other</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    {
                                        otherResources.map(otherResource => {
                                            return <Resource key={otherResource.id}
                                                resource={otherResource}
                                                handleDeleteResource={handleDeleteResource}
                                            />
                                        })
                                    }
                                </Table>
                            </Container>
                        </>
                }
            </Container>
        </>
    );
};


export default ResourcesList;