import React, { useContext } from "react";
import { LanguageContext } from "../../providers/LanguageProvider.js";
import { useHistory, useParams } from 'react-router-dom';


const LanguageDeletionConfirmation = () => {
    const history = useHistory();
    const { languageId } = useParams();
    const { deleteLanguage } = useContext(LanguageContext);


    const handleRelease = () => {
        deleteLanguage(languageId)
            .then(() => {
                history.push("/")
            })
    }


    return (
        <>
            <h1> Delete </h1>
            <h3>Are you sure you wish to delete this language? Everything associated with this language will be deleted as well.</h3>
            <button onClick={handleRelease}>Delete</button>
            <button onClick={() => {
                history.push("/")
            }}>Cancel</button>
        </>
    );
};


export default LanguageDeletionConfirmation;