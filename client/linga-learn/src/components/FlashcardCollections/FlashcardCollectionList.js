import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../providers/LanguageProvider.js";
import { FlashcardCollectionContext } from "../../providers/FlashcardCollectionProvider.js";
import { Col, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { Link } from "react-router-dom";


const FlashcardCollectionList = () => {
    const { GetUserLanguages } = useContext(LanguageContext);
    const { GetUserFlashcardCollections } = useContext(FlashcardCollectionContext);
    const [languages, setLanguages] = useState([]);
    const [flashcardCollections, setFlashcardCollections] = useState([]);
    const [filteredFlashcardCollections, setfilteredFlashcardCollections] = useState([]);

    useEffect(() => {
        GetUserLanguages()
            .then(resp => setLanguages(resp))
    }, []);


    const [languageId, setLanguageId] = useState({
        languageId: 0,
    });

    const handleControlledInputChange = (event) => {
        const newLanguageId = { ...languageId }
        newLanguageId[event.target.id] = event.target.value
        setLanguageId(newLanguageId)
    }

    useEffect(() => {
        GetUserFlashcardCollections()
            .then(resp => setFlashcardCollections(resp))
            .then((flashcardCollections) => {
                flashcardCollections.filter(flashcardCollection => flashcardCollection.LanguageId === languageId)
            })
    }, [languageId]);

    useEffect(() => {
        const filteredCollections = flashcardCollections.filter(flashcardCollection => flashcardCollection.LanguageId === languageId)
            .then(setfilteredFlashcardCollections(filteredCollections))
    }, [flashcardCollections]);




    // const handleClickAddLanguage = () => {
    //     AddLanguage({
    //         languageName: language.languageName,
    //         languageProficiencyId: language.languageProficiencyId
    //     })
    //         .then(() => history.push("/"))
    // };



    return (
        <>
            <Form>
                <FormGroup>
                    <Label for="exampleSelect">Proficiency</Label>
                    <Input type="select" id="languageProficiencyId">
                        {
                            languages.map(language => {
                                return (
                                    <>
                                        <option value="0"></option>
                                        <option key={language.id} value={language.id} onChange={handleControlledInputChange}>
                                            {language.langaugeName}
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
                    {filteredFlashcardCollections.forEach(filteredFlashcardCollection => <Link>{filteredFlashcardCollection.Topic}</Link>)}
                </Col>
            </Container>
        </>
    );
};



export default FlashcardCollectionList;