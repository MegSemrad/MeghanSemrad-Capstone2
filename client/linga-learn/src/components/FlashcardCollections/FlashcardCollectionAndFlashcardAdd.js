import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LanguageContext } from "../../providers/LanguageProvider.js";
import { FlashcardCollectionContext } from "../../providers/FlashcardCollectionProvider.js";
import { FlashcardContext } from "../../providers/FlashcardProvider.js";
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

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
        isStudying: "",
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
    }

    const handleSaveFlashcardCollectionWithFlashcards = () => {
        addFlashcardCollection({
            languageId: flashcardCollection.languageId,
            date: flashcardCollection.date,
            topic: flashcardCollection.topic,
        })
            .then((newFlashcardCollection) => {
                addFlashcard({
                    flashcardCollectionId: newFlashcardCollection.id,
                    word: flashcard.word,
                    translatedWord: flashcard.translatedWord,
                    isStudying: flashcard.isStudying,
                })
                    .then(() => history.push(`/FlashcardList/${newFlashcardCollection.id}`))
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
                                                <option key={language.id} value={flashcardCollection.languageId} >
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
            </Row>


            <Button>Add card</Button>
            <Button onClick={handleSaveFlashcardCollectionWithFlashcards}>Save</Button>

        </Form>
    );

    // OPTION FOR BUTTON!!
    // <Button color="primary" onClick={handleSavePost}>
    //     <Link className="savePost" to={"/Posts"} style={{ color: `#FFF` }}>
    //         Save Post
    // </Link>
    // </Button>
}

export default FlashcardCollectionAndFlashcardAdd;