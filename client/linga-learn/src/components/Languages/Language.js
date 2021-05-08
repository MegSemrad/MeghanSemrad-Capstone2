
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { Card, CardBody, Button } from 'reactstrap';



const Language = ({ language }) => {
    const history = useHistory();

    return (
        <Card key={language.id}>
            <Card key={language.id}>
                <CardBody>{language.languageName}</CardBody>
                <Button className="showEditandDeleteButton" onClick={() => {
                    history.push(`/EditLanguage/${language.id}`)
                }}>✏</Button>
                <Button className="showEditandDeleteButton">✖</Button>
            </Card>
        </Card>
    );
};


export default Language;