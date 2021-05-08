import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { LanguageContext } from "../../providers/LanguageProvider.js";
import { LanguageProficiencyContext } from "../../providers/LanguageProficiencyProvider";
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label,
    FormGroup, Container, Row, Col, Card, CardTitle, CardText, CardBody,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';






const LanguageList = (props) => {
    const history = useHistory();
    const { GetUserLanguages } = useContext(LanguageContext);
    const [languages, setLanguages] = useState([]);
    const [knownLanguages, setKnownLanguages] = useState([]);
    const [learningLanguages, setLearningLanguages] = useState([]);
    const [futureLanguages, setFutureLanguages] = useState([]);



    //---------------------------FOR LIST----------------------------------------------------

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
                    <Col>
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
                    </Col>

                    <Col>
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
                    </Col>

                    <Col>
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
                    </Col>
                </Row>
                <Row>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle>
                            <Col sm={{ size: 'auto', offset: 1 }}>...</Col>
                        </DropdownToggle>
                        <DropdownMenu container="body">
                            <DropdownItem onClick={() => {
                                toggle()
                                history.push("/AddLanguage")
                            }} >Add</DropdownItem>
                            <DropdownItem to="/Manage">Manage</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Row>
            </Container>

        </>
    );
};



export default LanguageList;