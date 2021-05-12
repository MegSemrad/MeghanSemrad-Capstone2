import React, { useContext } from "react";
import { LanguageContext } from "../../providers/LanguageProvider.js";
import { useHistory, useParams } from 'react-router-dom';
import { Button, Container } from 'reactstrap';


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
        <Container className="languageDeletionConfirmationContainer">
            <h3>Are you sure you wish to delete this language? Everything associated with this language will be deleted as well.</h3>
            <Button className="languageDeleteButton" onClick={handleRelease}>Delete</Button>
            <Button className="languageCancelDeleteButton" onClick={() => {
                history.push("/")
            }}>Cancel</Button>
        </Container>
    );
};


export default LanguageDeletionConfirmation;