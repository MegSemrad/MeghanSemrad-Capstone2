import React, { useContext } from "react";
import { FlashcardCollectionContext } from "../../providers/FlashcardCollectionProvider.js";
import { useHistory, useParams } from 'react-router-dom';


const FlashcardCollectionDeletionConfirmation = () => {
    const history = useHistory();
    const { FlashcardCollectionId } = useParams();
    const { deleteFlashcardCollection } = useContext(FlashcardCollectionContext);


    const handleRelease = () => {
        deleteFlashcardCollection(FlashcardCollectionId)
            .then(() => {
                history.push("/FlashcardCollectionList")
            })
    }

    return (
        <>
            <h1> Delete </h1>
            <h3>Are you sure you wish to delete this collection? All flashcards belonging to this collection will be deleted as well.</h3>
            <button onClick={handleRelease}>Delete</button>
            <button onClick={() => {
                history.push(`/FlashcardList/${FlashcardCollectionId}`)
            }}>Cancel</button>
        </>
    );
};


export default FlashcardCollectionDeletionConfirmation;