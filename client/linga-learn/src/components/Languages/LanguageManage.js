import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { LanguageContext } from "../../providers/LanguageProvider.js";
import { Card, CardBody, Container, Label, Row } from 'reactstrap';



const LanguageManage = (props) => {
    const history = useHistory();
    const { GetUserLanguages } = useContext(LanguageContext);
    const [languages, setLanguages] = useState([]);
    const [knownLanguages, setKnownLanguages] = useState([]);
    const [learningLanguages, setLearningLanguages] = useState([]);
    const [futureLanguages, setFutureLanguages] = useState([]);



    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);



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
        <>
            <Container className="languageContainer">
                <Row xs="3">
                    <Container>
                        <Label tag="h5">Know</Label>
                        {
                            knownLanguages.map(knownLanguage => {
                                return <Card key={knownLanguage.id}>
                                    <CardBody>{knownLanguage.languageName}</CardBody>
                                </Card>
                            })
                        }
                    </Container>

                    <Container>
                        <Label tag="h5">Learning</Label>
                        {
                            learningLanguages.map(learningLanguage => {
                                return <Card key={learningLanguage.id}>
                                    <CardBody>{learningLanguage.languageName}</CardBody>
                                </Card>
                            })
                        }
                    </Container>

                    <Container>
                        <Label tag="h5">Future</Label>
                        {
                            futureLanguages.map(futureLanguage => {
                                return <Card key={futureLanguage.id}>
                                    <CardBody>{futureLanguage.languageName}</CardBody>
                                </Card>
                            })
                        }
                    </Container>

                </Row>
            </Container>

        </>
    );
};



export default LanguageManage;

