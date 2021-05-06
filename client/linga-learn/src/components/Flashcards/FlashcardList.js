import React, { useContext, useEffect, useState } from "react";
import { FlashcardContext } from "../../providers/FlashcardProvider.js";
import { Button, Card, CardBody, CardFooter, Col, Container, Row } from 'reactstrap';
import { useHistory, useParams } from "react-router-dom";



const FlashcardList = () => {
    const history = useHistory();
    const { flashcards, getFlashcardsByCollectionId } = useContext(FlashcardContext);
    const [studyItFlashcards, setStudyItFlashcards] = useState([]);
    const [knowItFlashcards, setKnowItFlashcards] = useState([]);
    const { FlashcardCollectionId } = useParams();



    useEffect(() => {
        getFlashcardsByCollectionId(FlashcardCollectionId)
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
                                <CardFooter>
                                    <Row>
                                        <div>◀</div>
                                        <div>🔁</div>
                                        <div>▶</div>
                                    </Row>
                                </CardFooter>
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
                                <CardFooter>
                                    <Row>
                                        <div>◀</div>
                                        <div>🔁</div>
                                        <div>▶</div>
                                    </Row>
                                </CardFooter>
                            </Card>
                        ))}
                    </>
                </Col>
            </Row>
            <Row>
                <div>✏</div>
                <div onClick={() => {
                    history.push(`/Delete/${FlashcardCollectionId}`)
                }}>🗑</div>
            </Row>

        </Container >
    );
};



export default FlashcardList;