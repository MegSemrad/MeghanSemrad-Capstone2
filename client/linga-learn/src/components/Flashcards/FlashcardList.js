import React, { useContext, useEffect, useState } from "react";
import { FlashcardContext } from "../../providers/FlashcardProvider.js";
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { useParams } from "react-router-dom";


const FlashcardList = () => {
    const { GetFlashcardsByCollectionId } = useContext(FlashcardContext);
    const [flashcards, setFlashcards] = useState([]);
    const { FlashcardCollectionId } = useParams();



    useEffect(() => {
        GetFlashcardsByCollectionId(FlashcardCollectionId)
            .then(resp => setFlashcards(resp))
    }, []);





    return (
        <Container className="flashcardContainer">
            <Row>
                <Col xs="2">
                    <>
                        <h4>Study It</h4>
                        {flashcards.map((flashcard) => (
                            <Card key={flashcard.id}>
                                <CardBody>
                                    {flashcard.word}
                                </CardBody>
                            </Card>
                        ))}
                    </>
                </Col>

                <Col xs="2">
                    <h4>Know It</h4>
                    <Card>
                        <CardBody>

                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </Container >
    );
};



export default FlashcardList;