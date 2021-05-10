import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../providers/LanguageProvider.js";
import { FlashcardCollectionContext } from "../../providers/FlashcardCollectionProvider.js";
import { Col, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { Link } from "react-router-dom";


const FlashcardCollectionList = () => {
    const { getUserLanguages } = useContext(LanguageContext);
    const { getUserFlashcardCollections } = useContext(FlashcardCollectionContext);
    const [languages, setLanguages] = useState([]);
    const [flashcardCollections, setFlashcardCollections] = useState([]);
    const [filteredFlashcardCollections, setfilteredFlashcardCollections] = useState([]);
    const [languageId, setLanguageId] = useState({
        languageId: 0,
    });


    useEffect(() => {
        getUserLanguages()
            .then(resp => setLanguages(resp))
    }, []);



    const handleControlledInputChange = (event) => {
        const newLanguageId = { ...languageId }
        newLanguageId[event.target.id] = event.target.value
        setLanguageId(newLanguageId)
    }



    useEffect(() => {
        getUserFlashcardCollections()
            .then(resp => setFlashcardCollections(resp))
            .then(() => {
                const filteredCollections = flashcardCollections.filter((flashcardCollection) => {
                    return flashcardCollection.languageId === parseInt(languageId.languageId)
                })
                setfilteredFlashcardCollections(filteredCollections)
            })
    }, [languageId]);




    return (
        <>
            <Form>
                <FormGroup>
                    <Label for="languageSelect">Sort by Language: </Label>
                    <Input type="select" onChange={handleControlledInputChange} id="languageId">
                        <option value="0" ></option>
                        {
                            languages.map(language => {
                                return (
                                    <>
                                        <option key={language.id} value={language.id} >
                                            {language.languageName}
                                        </option>
                                    </>
                                )
                            })
                        }
                    </Input>
                </FormGroup>
            </Form>


            <Container >
                <Col>
                    {filteredFlashcardCollections.map(filteredFlashcardCollection => <Link to={`/FlashcardList/${filteredFlashcardCollection.id}`}> {filteredFlashcardCollection.topic}</Link>)}
                </Col>
            </Container>
        </>
    );
};



export default FlashcardCollectionList;