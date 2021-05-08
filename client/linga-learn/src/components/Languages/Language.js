
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { Row, Card, CardBody, Button } from 'reactstrap';






const Language = ({ language, handleManageClick }) => {

    return (
        <Card key={language.id}>
            <Card key={language.id}>
                <CardBody>{language.languageName}</CardBody>
                <Button className="showEditandDeleteButton">✏</Button>
                <Button className="showEditandDeleteButton">✖</Button>
            </Card>
        </Card>
    );
};


export default Language;