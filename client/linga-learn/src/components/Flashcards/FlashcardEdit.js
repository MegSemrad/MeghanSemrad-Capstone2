import React, { useContext, useEffect, useState } from "react";
import { FlashcardContext } from "../../providers/FlashcardProvider.js";
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, Col, Input, Label } from 'reactstrap';


const FlashcardEdit = () => {
    const { FlashcardId } = useParams();
    const history = useHistory();
    const { getFlashcardById, editFlashcard, deleteSingleFlashcard } = useContext(FlashcardContext);


    const [flashcard, setFlashcard] = useState({
        word: "",
        translatedWord: "",
    })


    useEffect(() => {
        getFlashcardById(FlashcardId)
            .then(returnedFlashcard => setFlashcard(returnedFlashcard))
    }, []);


    const handleControlledInputChange = (event) => {
        const newFlashcard = { ...flashcard }
        newFlashcard[event.target.id] = event.target.value
        setFlashcard(newFlashcard)
    };


    const handleClickSaveFlashcard = () => {
        editFlashcard({
            id: FlashcardId,
            word: flashcard.word,
            translatedWord: flashcard.translatedWord,
            flashcardCollectionId: flashcard.flashcardCollectionId
        })
            .then(() => history.push(`/FlashcardList/${flashcard.flashcardCollectionId}`))
    };


    const handleDeleteFlashcard = (flashcard) => {
        const flashcardCollectionId = flashcard.flashcardCollectionId
        deleteSingleFlashcard(flashcard.id)
            .then(() => history.push(`/FlashcardList/${flashcardCollectionId}`))
    }


    return (
        <div className="CommentForm">
            <h2 className="CommentForm__title">Edit Flashcards</h2>
            <Col xs="4">
                <>
                    <Card key={flashcard.id} className="flashcardEditCard">
                        <fieldset>
                            <div className="form-group">
                                <div className="cardHeaderForFlashcardEditForm">
                                    <Button
                                        outline
                                        close
                                        className="flashcardEditDeleteButton"
                                        onClick={event => {
                                            event.preventDefault()
                                            handleDeleteFlashcard(flashcard)
                                        }}><span aria-hidden>✖</span></Button>

                                </div>
                                <Label htmlFor="word">Word:</Label>
                                <Input type="text" id="word" onChange={handleControlledInputChange}
                                    required autoFocus
                                    className="form-control"
                                    placeholder="Word"
                                    defaultValue={flashcard.word} />
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <Label htmlFor="translatedWord">Translation:</Label>
                                <Input type="text" id="translatedWord" onChange={handleControlledInputChange}
                                    required autoFocus
                                    className="form-control"
                                    placeholder="Translation"
                                    defaultValue={flashcard.translatedWord} />
                            </div>
                        </fieldset>
                    </Card>
                </>

                <button className="btn btn-primary"
                    onClick={handleClickSaveFlashcard}>
                    Save</button>
            </Col>
        </div>
    );
};

export default FlashcardEdit;