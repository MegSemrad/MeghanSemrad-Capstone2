import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LanguageContext } from "../../providers/LanguageProvider.js";
import { FlashcardCollectionContext } from "../../providers/FlashcardCollectionProvider.js";
import { FlashcardContext } from "../../providers/FlashcardProvider.js";
import { Card, Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const FlashcardCollectionAndFlashcardAdd = () => {
    const history = useHistory();
    const { GetUserLanguages } = useContext(LanguageContext);
    const { addFlashcardCollection } = useContext(FlashcardCollectionContext);
    const { addFlashcard } = useContext(FlashcardContext);


    const [languages, setLanguages] = useState([]);
    const [flashcardCollection, setFlashcardCollection] = useState({
        languageId: 0,
        date: "",
        topic: "",
    });
    const [flashcard, setFlashcard] = useState({
        flashcardCollectionId: 0,
        word: "",
        translatedWord: "",
    });




    useEffect(() => {
        GetUserLanguages()
            .then(resp => setLanguages(resp))
    }, []);



    const handleControlledInputChangeForFlashcardCollection = (event) => {
        const newFlashcardCollection = { ...flashcardCollection }
        newFlashcardCollection[event.target.id] = event.target.value
        setFlashcardCollection(newFlashcardCollection)
    }


    const handleControlledInputChangeForFlashcard = (event) => {
        const newFlashcard = { ...flashcard }
        newFlashcard[event.target.id] = event.target.value
        setFlashcard(newFlashcard)
        newFlashcards.push(newFlashcard)
    }


    const newFlashcards = []




    const handleSaveFlashcardCollection = () => {
        addFlashcardCollection({
            languageId: flashcardCollection.languageId,
            date: flashcardCollection.date,
            topic: flashcardCollection.topic,
        })
            .then(() => {
                const visible = "visible";
                showFlashcardInput(visible)
            })
    };


    const handleSaveFlashcard = (newFlashcardCollection) => {
        addFlashcard({
            flashcardCollectionId: newFlashcardCollection.id,
            word: flashcard.word,
            translatedWord: flashcard.translatedWord,
        })
    };

    //        .then(() => history.push(`/FlashcardList/${newFlashcardCollection.id}`))



    const showFlashcardInput = (visible) => {
        const showFlashcardInputId = document.getElementById("AddFlashcardRowVisibility");
        showFlashcardInputId.style.visibility = visible;
    }


    return (
        <Form>

            <Row form>
                <Col md={4}>
                    <FormGroup row>
                        <Label for="languageSelect" sm={2}>Language</Label>
                        <Col sm={10}>
                            <Input type="select"
                                onChange={handleControlledInputChangeForFlashcardCollection}
                                id="languageId">
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
                        </Col>
                    </FormGroup>
                </Col>


                <Col md={4}>
                    <FormGroup>
                        <Label for="dateState">Date</Label>
                        <Input
                            type="date"
                            onChange={handleControlledInputChangeForFlashcardCollection}
                            requiredAutoClassName="form-control"
                            id="date"
                            value={flashcardCollection.date} />
                    </FormGroup>
                </Col>


                <Col md={4}>
                    <FormGroup>
                        <Label for="topic">Topic</Label>
                        <Input
                            type="topic"
                            onChange={handleControlledInputChangeForFlashcardCollection}
                            requiredAutoClassName="form-control"
                            id="topic"
                            value={flashcardCollection.topic} />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Button onClick={handleSaveFlashcardCollection}>Save</Button>
            </Row>


            <Row id="AddFlashcardRowVisibility">
                <FormGroup>
                    <Label for="flashcard">Word</Label>
                    <Input
                        type="word"
                        onChange={handleControlledInputChangeForFlashcard}
                        requiredAutoClassName="form-control"
                        id="word"
                        value={flashcard.word} />
                </FormGroup>
                <FormGroup>
                    <Label for="translation">Translation</Label>
                    <Input
                        type="translatedWord"
                        onChange={handleControlledInputChangeForFlashcard}
                        requiredAutoClassName="form-control"
                        id="translatedWord"
                        value={flashcard.translatedWord} />
                </FormGroup>
                <Button onClick={handleSaveFlashcard}>Add card</Button>
            </Row>


            <Row className="flashcardContainer">
                {
                    newFlashcards.map(newFlashcard => {
                        return <><Card key={newFlashcard.id} >{newFlashcard.word}</Card><Card key={newFlashcard.id} >{newFlashcard.translatedWord}</Card></>
                    })
                }
            </Row>


        </Form >
    );
}



export default FlashcardCollectionAndFlashcardAdd;