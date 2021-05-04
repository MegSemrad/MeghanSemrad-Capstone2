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
    const [languageId, setLanguageId] = useState({
        languageId: 0,
    });


    useEffect(() => {
        GetUserLanguages()
            .then(resp => setLanguages(resp))
    }, []);



    const handleControlledInputChange = (event) => {
        const newLanguageId = { ...languageId }
        debugger
        newLanguageId[event.target.id] = event.target.value
        setLanguageId(newLanguageId)
    }



    useEffect(() => {
        GetUserFlashcardCollections()
            .then(resp => setFlashcardCollections(resp))
            .then(() => {
                const filteredCollections = flashcardCollections.filter((flashcardCollection) => {
                    return flashcardCollection.languageId === parseInt(languageId.languageId)
                })
                setfilteredFlashcardCollections(filteredCollections)
            })
    }, [languageId]);








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
                    <Label for="exampleSelect">Languages</Label>
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
                    {filteredFlashcardCollections.map(filteredFlashcardCollection => <Link>{filteredFlashcardCollection.topic}</Link>)}
                </Col>
            </Container>
        </>
    );
};



export default FlashcardCollectionList;