import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../providers/LanguageProvider.js";
import { Card, Button, CardTitle, CardText, CardDeck, CardBody } from 'reactstrap';


const LanguageList = () => {
    const { GetUserLanguages } = useContext(LanguageContext);
    const [languages, setLanguages] = useState([]);
    const [matchedLanguages, setMatchedLanguages] = useState([]);

    //get user specific languages - works server side 
    //filter to find ones under "know" category 
    //then find language name
    //post it to the card 

    useEffect(() => {
        GetUserLanguages()
            .then(resp => setLanguages(resp))
    }, []);

    useEffect(() => {
        const matchedLanguages = languages.filter(language => language.languageProficiencyId === 1)
        setMatchedLanguages(matchedLanguages)
    }, [languages]);

    return (
        <CardDeck>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Know</CardTitle>
                    {
                        matchedLanguages.map(matchedLanguage => {
                            return <CardText key={matchedLanguage.id}>{matchedLanguage.languageName}</CardText>
                        })
                    }

                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Learning</CardTitle>
                    <CardText>Languages learning</CardText>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Future</CardTitle>
                    <CardText>Languages for the future </CardText>
                </CardBody>
            </Card>
            <Button>...</Button>
        </CardDeck>
    );
};

export default LanguageList;