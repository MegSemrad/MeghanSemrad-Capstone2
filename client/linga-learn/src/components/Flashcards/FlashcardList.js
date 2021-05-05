import React, { useContext, useEffect, useState } from "react";
import { FlashcardContext } from "../../providers/FlashcardProvider.js";
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { useParams } from "react-router-dom";


const FlashcardList = () => {
    const { GetFlashcardsByCollectionId } = useContext(FlashcardContext);
    const [flashcards, setFlashcards] = useState([]);
    const [studyItFlashcards, setStudyItFlashcards] = useState([]);
    const [knowItFlashcards, setKnowItFlashcards] = useState([]);
    const { FlashcardCollectionId } = useParams();



    useEffect(() => {
        GetFlashcardsByCollectionId(FlashcardCollectionId)
            .then(resp => setFlashcards(resp))
    }, []);


    useEffect(() => {
        const flashcardsToStudy = flashcards.filter(flashcard => flashcard.isStudying === true)
        setStudyItFlashcards(flashcardsToStudy)
    }, [flashcards]);

    useEffect(() => {
        const flashcardsKnow = flashcards.filter(flashcard => flashcard.isStudying === false)
        setKnowItFlashcards(flashcardsKnow)
    }, [flashcards]);


    return (
        <Container className="flashcardContainer">
            <Row>
                <Col xs="2">
                    <>
                        <h4>Study It</h4>
                        {studyItFlashcards.map((studyItFlashcard) => (
                            <Card key={studyItFlashcard.id}>
                                <CardBody>
                                    {studyItFlashcard.word}
                                </CardBody>
                            </Card>
                        ))}
                    </>
                </Col>

                <Col xs="2">
                    <>
                        <h4>Know It</h4>
                        {knowItFlashcards.map((knowItFlashcard) => (
                            <Card key={knowItFlashcard.id}>
                                <CardBody>
                                    {knowItFlashcard.word}
                                </CardBody>
                            </Card>
                        ))}
                    </>
                </Col>
            </Row>

        </Container >
    );
};



export default FlashcardList;