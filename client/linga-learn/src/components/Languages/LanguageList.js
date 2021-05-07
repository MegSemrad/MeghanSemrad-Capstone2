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
    const { GetUserLanguages } = useContext(LanguageContext);
    const [languages, setLanguages] = useState([]);
    const [knownLanguages, setKnownLanguages] = useState([]);
    const [learningLanguages, setLearningLanguages] = useState([]);
    const [futureLanguages, setFutureLanguages] = useState([]);



    //---------------------------FOR MODAL----------------------------------------------------


    const {
        buttonLabel,
        className
    } = props;
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);


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




    //---------------------------FOR ADD----------------------------------------------------



    const history = useHistory();
    const { AddLanguage } = useContext(LanguageContext)
    const { GetLanguageProficiencies } = useContext(LanguageProficiencyContext)

    const [languageProficiencies, setLanguageProficiencies] = useState([]);


    useEffect(() => {
        GetLanguageProficiencies()
            .then(resp => setLanguageProficiencies(resp))
    }, []);



    const [language, setLanguage] = useState({
        languageName: "",
        languageProficiencyId: 0,
    });


    const handleControlledInputChange = (event) => {
        const newLanguage = { ...language }
        newLanguage[event.target.id] = event.target.value
        setLanguage(newLanguage)
    }



    const handleClickAddLanguage = () => {
        AddLanguage({
            languageName: language.languageName,
            languageProficiencyId: language.languageProficiencyId
        })
            .then(() => history.push("/"))
    };


    //------------------------------------------------------------------------------

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
                            <DropdownItem onClick={toggle} >Add</DropdownItem>
                            <DropdownItem to="/Manage">Manage</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Row>
            </Container>





            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add A Language</ModalHeader>
                <ModalBody>
                    <h3>this is a modal...hopefully</h3>

                    {/* <FormGroup>
                        <Label for="examplePassword">Language</Label>
                        <Input type="text"
                            id="languageName"
                            value={language.languageName}
                            onChange={handleControlledInputChange}
                            requiredAutoClassName="form-control"
                            placeholder="language" />
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleSelect">Proficiency</Label>
                        <Input type="select" id="languageProficiencyId" onChange={handleControlledInputChange}>
                            <option value="0"></option>
                            {
                                languageProficiencies.map(languageProficiency => {
                                    return (
                                        <>
                                            <option key={languageProficiency.id} value={languageProficiency.id}>
                                                {languageProficiency.proficiency}
                                            </option>
                                        </>
                                    )
                                })
                            }
                        </Input>
                    </FormGroup> */}

                </ModalBody>
                <ModalFooter>
                    {/* <Button onClick={event => {
                        event.preventDefault()
                        handleClickAddLanguage()
                        toggleModal()
                    }}>Add</Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button> */}
                </ModalFooter>
            </Modal>
        </>
    );
};



export default LanguageList;