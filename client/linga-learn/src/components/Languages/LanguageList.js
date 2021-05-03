import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../providers/LanguageProvider.js";
import { Card, Button, CardTitle, CardText, CardDeck, CardBody } from 'reactstrap';


const LanguageList = () => {
    const { languages, GetUserLanguages } = useContext(LanguageContext);
    const [matchedLanguages, setMatchedLanguages] = useState([]);

    useEffect(() => {
        GetUserLanguages()
    }, []);

    useEffect(() => {
        const matchedLanguages = languages.filter(language => language.LanguageProficiency?.Proficiency === "Know")
        setMatchedLanguages(matchedLanguages)
    }, [languages]);

    return (
        <CardDeck>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Know</CardTitle>
                    {
                        matchedLanguages.map(matchedLanguage => {
                            return <CardText>{matchedLanguage.LanguageName}</CardText>
                        })
                    }
                    <CardText>Languages Know</CardText>
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