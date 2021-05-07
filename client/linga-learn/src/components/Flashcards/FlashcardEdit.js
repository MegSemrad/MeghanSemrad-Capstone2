import React, { useContext, useEffect, useState } from "react";
import { FlashcardContext } from "../../providers/FlashcardProvider.js";
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, Col, Input, Label } from 'reactstrap';


const CommentEditForm = () => {
    const { FlashcardCollectionId } = useParams();
    const history = useHistory();
    const { flashcards, getFlashcardsByCollectionId } = useContext(FlashcardContext);

    useEffect(() => {
        getFlashcardsByCollectionId(FlashcardCollectionId)
            .then(() => {

            })
    }, []);


    const

    const [flashcard, setFlashcard] = useState({
        id: flashcard.id,
        word: flashcard.word,
        translatedWord: flashcard.translatedWord,
    })
    const handleControlledInputChange = (event) => {
        const newFlashcard = { ...flashcard }
        newFlashcard[event.target.id] = event.target.value
        setFlashcard(newFlashcard)
    };

    // const handleClickSaveFlashcards = () => {
    //     editComment({
    //         id: commentId,
    //         postId: comment.postId,
    //         subject: comment.subject,
    //         content: comment.content
    //     })
    //         .then(() => history.push(`/FlashcardList/${FlashcardCollectionId}`))
    // };





    return (
        <div className="CommentForm">
            <h2 className="CommentForm__title">Edit Flashcards</h2>
            <Col xs="4">
                {
                    flashcards.map((flashcard) => {
                        return <>
                            <Card>
                                <fieldset>
                                    <div className="form-group">
                                        <Button>✖</Button>
                                        <Label htmlFor="word">Word:</Label>
                                        <Input type="text" id="word" onChange={handleControlledInputChange}
                                            required autoFocus
                                            className="form-control"
                                            placeholder="Word"
                                            value={flashcard.word} />
                                    </div>
                                </fieldset>

                                <fieldset>
                                    <div className="form-group">
                                        <Label htmlFor="translatedWord">Translation:</Label>
                                        <Input type="text" id="translatedWord" onChange={handleControlledInputChange}
                                            required autoFocus
                                            className="form-control"
                                            placeholder="Translation"
                                            value={flashcard.translatedWord} />
                                    </div>
                                </fieldset>
                            </Card>
                        </>
                    })
                }




                {/* <button className="btn btn-primary"
                    onClick={handleClickSaveFlashcards}>
                    Save</button> */}
            </Col>
        </div>
    )
}

export default CommentEditForm;