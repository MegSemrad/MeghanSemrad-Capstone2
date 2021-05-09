import React, { useContext, useEffect, useState } from "react";
import { FlashcardContext } from "../../providers/FlashcardProvider.js";
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, Col, Input, Label } from 'reactstrap';


const FlashcardEdit = () => {
    const { FlashcardId } = useParams();
    const history = useHistory();
    const { flashcard, getFlashcardById, editFlashcard } = useContext(FlashcardContext);


    const [localFlashcard, setLocalFlashcard] = useState({
        word: "",
        translatedWord: "",
    })



    useEffect(() => {
        getFlashcardById(FlashcardId)
            .then(() => setLocalFlashcard(flashcard))
    }, []);


    useEffect(() => {
        setLocalFlashcard(flashcard)
        console.log("local?", localFlashcard)
    }, [localFlashcard]);


    const handleControlledInputChange = (event) => {
        const newFlashcard = { ...localFlashcard }
        newFlashcard[event.target.id] = event.target.value
        setLocalFlashcard(newFlashcard)
        console.log("new?", newFlashcard)
    };


    const handleClickSaveFlashcard = () => {
        editFlashcard({
            id: localFlashcard.id,
            word: localFlashcard.word,
            translatedWord: localFlashcard.translatedWord
        })
            .then(() => history.push(`/FlashcardList/${flashcard.flashcardCollectionId}`))
    };





    return (
        <div className="CommentForm">
            <h2 className="CommentForm__title">Edit Flashcards</h2>
            <Col xs="4">
                return <>
                    <Card key={flashcard.id}>
                        <fieldset>
                            <div className="form-group">
                                <Button outline>✖</Button>
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
    )
}

export default FlashcardEdit;