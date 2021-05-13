import React, { useContext } from "react";
import { FlashcardCollectionContext } from "../../providers/FlashcardCollectionProvider.js";
import { useHistory, useParams } from 'react-router-dom';
import { Button, Container } from 'reactstrap';


const FlashcardCollectionDeletionConfirmation = () => {
    const history = useHistory();
    const { FlashcardCollectionId } = useParams();
    const { deleteFlashcardCollection } = useContext(FlashcardCollectionContext);


    const handleRelease = () => {
        deleteFlashcardCollection(FlashcardCollectionId)
            .then(() => {
                history.push("/FlashcardCollectionList")
            })
    };


    return (
        <Container className="flashcardCollectionDeletionConfirmationContainer">
            <h3>Are you sure you wish to delete this collection? All flashcards belonging to this collection will be deleted as well.</h3>
            <Button className="flashcardCollectionDeleteButton" onClick={handleRelease}>Delete</Button>
            <Button className="flashcardCollectionCancelDeleteButton" onClick={() => {
                history.push(`/FlashcardList/${FlashcardCollectionId}`)
            }}>Cancel</Button>
        </Container>
    );
};


export default FlashcardCollectionDeletionConfirmation;