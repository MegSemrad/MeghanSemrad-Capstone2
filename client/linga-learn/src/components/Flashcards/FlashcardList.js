import React, { useContext, useEffect, useState } from "react";
import { FlashcardContext } from "../../providers/FlashcardProvider.js";
import { Col, Container, Row } from 'reactstrap';
import { useHistory, useParams } from "react-router-dom";
import Flashcard from "./Flashcard.js"


const FlashcardList = () => {
    const history = useHistory();
    const { flashcards, getFlashcardsByCollectionId, editFlashcard } = useContext(FlashcardContext);
    const [studyItFlashcards, setStudyItFlashcards] = useState([]);
    const [knowItFlashcards, setKnowItFlashcards] = useState([]);
    const { FlashcardCollectionId } = useParams();


    useEffect(() => {
        getFlashcardsByCollectionId(FlashcardCollectionId)
    }, []);


    useEffect(() => {
        const flashcardsToStudy = flashcards.filter(flashcard => flashcard.isStudying === true)
        setStudyItFlashcards(flashcardsToStudy)

        const flashcardsToKnow = flashcards.filter(flashcard => flashcard.isStudying === false)
        setKnowItFlashcards(flashcardsToKnow)
    }, [flashcards]);


    const handleSwitchToKnowIt = (flashcard) => {
        flashcard.isStudying = false
        editFlashcard(flashcard)
        getFlashcardsByCollectionId(FlashcardCollectionId)
    };


    const handleSwitchToStudyIt = (flashcard) => {
        flashcard.isStudying = true
        editFlashcard(flashcard)
        getFlashcardsByCollectionId(FlashcardCollectionId)
    };



    return (
        <Container className="flashcardContainer">
            <Row>
                <Col xs="4">
                    <>
                        <h4>Study It</h4>
                        {
                            studyItFlashcards.map(studyItFlashcard => {
                                return <Flashcard key={studyItFlashcard.id}
                                    flashcard={studyItFlashcard}
                                    handleSwitchToKnowIt={handleSwitchToKnowIt}
                                />
                            })
                        }
                    </>
                </Col>

                <Col xs="4">
                    <>
                        <h4>Know It</h4>
                        {
                            knowItFlashcards.map(knowItFlashcard => {
                                return <Flashcard key={knowItFlashcard.id}
                                    flashcard={knowItFlashcard}
                                    handleSwitchToStudyIt={handleSwitchToStudyIt}
                                />
                            })
                        }
                    </>
                </Col>

            </Row>

            <Row>
                <div onClick={() => {
                    history.push(`/Delete/${FlashcardCollectionId}`)
                }}>🗑</div>
            </Row>
        </Container>
    )



};




export default FlashcardList;

