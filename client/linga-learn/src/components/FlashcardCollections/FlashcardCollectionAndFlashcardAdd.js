import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LanguageContext } from "../../providers/LanguageProvider.js";
import { FlashcardCollectionContext } from "../../providers/FlashcardCollectionProvider.js";
import { FlashcardContext } from "../../providers/FlashcardProvider.js";
import { Card, Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';



const FlashcardCollectionAndFlashcardAdd = () => {

    const history = useHistory();
    const { GetUserLanguages } = useContext(LanguageContext);
    const { flashcardCollection, addFlashcardCollection } = useContext(FlashcardCollectionContext);
    const { flashcards, addFlashcard } = useContext(FlashcardContext);

    const [newFlashcardCollection, setNewFlashcardCollection] = useState({
        languageId: 0,
        date: "",
        topic: "",
    });
    const [flashcard, setFlashcard] = useState({
        flashcardCollectionId: 0,
        word: "",
        translatedWord: "",
        isStudying: true,
    });
    const [languages, setLanguages] = useState([]);



    useEffect(() => {
        GetUserLanguages()
            .then(resp => setLanguages(resp))
    }, []);



    const handleControlledInputChangeForFlashcardCollection = (event) => {
        const newFlashcardColl = { ...newFlashcardCollection }
        newFlashcardColl[event.target.id] = event.target.value
        setNewFlashcardCollection(newFlashcardColl)
    }

    const handleControlledInputChangeForFlashcard = (event) => {
        const newFlashcard = { ...flashcard }
        newFlashcard[event.target.id] = event.target.value
        setFlashcard(newFlashcard)
    }



    const handleSaveFlashcardCollection = () => {
        addFlashcardCollection({
            languageId: newFlashcardCollection.languageId,
            date: newFlashcardCollection.date,
            topic: newFlashcardCollection.topic,
        })
            .then(() => {
                const showFlashcardInputId = document.getElementById("AddFlashcardRowVisibility");
                showFlashcardInputId.style.visibility = "visible";

                const showStudyTimeButtonId = document.getElementById("AddStudyTimeButtonVisibility");
                showStudyTimeButtonId.style.visibility = "visible";

                const hideFlashcardCollectionButtonId = document.getElementById("hideFlashcardCollectionButtonVisibility");
                hideFlashcardCollectionButtonId.style.visibility = "hidden";
            })
    };


    const handleSaveFlashcard = () => {
        addFlashcard({
            flashcardCollectionId: flashcardCollection.id,
            word: flashcard.word,
            translatedWord: flashcard.translatedWord,
            isStudying: true,
        })
    };




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
                            value={newFlashcardCollection.date} />
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
                            value={newFlashcardCollection.topic} />
                    </FormGroup>
                </Col>
            </Row>

            <Row>
                <Button id="hideFlashcardCollectionButtonVisibility" onClick={handleSaveFlashcardCollection}>Save</Button>
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
                    flashcards.map(newFlashcard => {
                        return <><Card key={newFlashcard.id} >{newFlashcard.word}</Card><Card key={newFlashcard.id} >{newFlashcard.translatedWord}</Card></>
                    })
                }
            </Row>
            <Button id="AddStudyTimeButtonVisibility" onClick={() => {
                history.push(`/FlashcardList/${flashcardCollection.id}`)
            }}>Study Time!</Button>
        </Form >
    );
}




export default FlashcardCollectionAndFlashcardAdd;