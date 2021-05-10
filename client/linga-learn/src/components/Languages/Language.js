
import React from "react";
import { useHistory } from 'react-router-dom';
import { Card, CardBody, Button } from 'reactstrap';



const Language = ({ language }) => {
    const history = useHistory();

    return (
        <Card key={language.id}>
            <Card key={language.id}>
                <CardBody>{language.languageName}</CardBody>
                <Button outline
                    className="showEditandDeleteButton"
                    onClick={() => {
                        history.push(`/EditLanguage/${language.id}`)
                    }}>✏</Button>
                <Button outline
                    className="showEditandDeleteButton"
                    onClick={() => {
                        history.push(`/DeleteLanguage/${language.id}`)
                    }}>✖</Button>
            </Card>
        </Card>
    );
};


export default Language;