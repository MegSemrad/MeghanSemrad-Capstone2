import React from "react";
import { useHistory } from 'react-router-dom';
import { Card, CardBody, CardFooter, Button, Row } from 'reactstrap';


const Language = ({ language }) => {
    const history = useHistory();


    return (
        <Card key={language.id} className="languageCard">
            <CardBody className="languageCardBody">
                <Row>{language.languageName}</Row>
                <Row className="langaugeManageButtonRow">
                    <Button
                        outline
                        close
                        className="showEditandDeleteButton"
                        onClick={() => {
                            history.push(`/EditLanguage/${language.id}`)
                        }}><span aria-hidden className="showEditandDeleteButtonSpan">✏</span></Button>
                    <Button
                        outline
                        close
                        className="showEditandDeleteButton"
                        onClick={() => {
                            history.push(`/DeleteLanguage/${language.id}`)
                        }}><span aria-hidden className="showEditandDeleteButtonSpan">✖</span></Button>
                </Row>
            </CardBody>
        </Card>
    );
};


export default Language;