import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../providers/LanguageProvider.js";
import { Card, Button, CardTitle, CardText, CardDeck, CardBody } from 'reactstrap';


const LanguageList = () => {
    const { GetUserLanguages } = useContext(LanguageContext);
    const [languages, setLanguages] = useState([]);
    const [knownLanguages, setKnownLanguages] = useState([]);
    const [learningLanguages, setLearningLanguages] = useState([]);
    const [futureLanguages, setFutureLanguages] = useState([]);


    useEffect(() => {
        GetUserLanguages()
            .then(resp => setLanguages(resp))
    }, []);

    useEffect(() => {
        const knownLanguages = languages.filter(language => language.languageProficiencyId === 1)
        setKnownLanguages(knownLanguages)
    }, [languages]);

    useEffect(() => {
        const learningLanguages = languages.filter(language => language.languageProficiencyId === 2)
        setLearningLanguages(learningLanguages)
    }, [languages]);

    useEffect(() => {
        const futureLanguages = languages.filter(language => language.languageProficiencyId === 3)
        setFutureLanguages(futureLanguages)
    }, [languages]);

    return (
        <CardDeck>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Know</CardTitle>
                    {
                        knownLanguages.map(knownLanguage => {
                            return <CardText key={knownLanguage.id}>{knownLanguage.languageName}</CardText>
                        })
                    }

                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Learning</CardTitle>
                    {
                        learningLanguages.map(learningLanguage => {
                            return <CardText key={learningLanguage.id}>{learningLanguage.languageName}</CardText>
                        })
                    }
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Future</CardTitle>
                    {
                        futureLanguages.map(futureLanguage => {
                            return <CardText key={futureLanguage.id}>{futureLanguage.languageName}</CardText>
                        })
                    }
                </CardBody>
            </Card>
            <Button>...</Button>
        </CardDeck>
    );
};

export default LanguageList;