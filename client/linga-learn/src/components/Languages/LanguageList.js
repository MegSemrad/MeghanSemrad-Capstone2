import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { LanguageContext } from "../../providers/LanguageProvider.js";
import Language from "./Language.js";
import {
    Container, Row, Col, Card,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Label
} from 'reactstrap';






const LanguageList = (props) => {
    const history = useHistory();
    const { GetUserLanguages, DeleteLanguage } = useContext(LanguageContext);
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

    const handleManageClick = () => {
        const showEditandDeleteButton = document.getElementsByClassName("showEditandDeleteButton");

        for (let i = 0; i < showEditandDeleteButton.length; i++) {
            let item = showEditandDeleteButton[i];
            item.style.visibility = "visible";
        }
    }

    // const handleDeleteLanguage = (languageId) => {
    //     DeleteLanguage(languageId)
    //     //warning message about deleting all materials connected with selected language 
    //     //and delete flashcard collections, flashcards, and eventually resources --> this is done serverside in the language repository
    // }



    return (
        <>
            <Container className="languageContainer">
                <Row xs="3">
                    <Col>
                        <Label tag="h5">Know</Label>
                        {
                            knownLanguages.map(knownLanguage => {
                                return <Language key={knownLanguage.id}
                                    language={knownLanguage}
                                    handleManageClick={handleManageClick}
                                />
                            })
                        }
                    </Col>

                    <Col>
                        <Label tag="h5">Learning</Label>
                        {
                            learningLanguages.map(learningLanguage => {
                                return <Language key={learningLanguage.id}
                                    language={learningLanguage}
                                    handleManageClick={handleManageClick}
                                />
                            })
                        }
                    </Col>

                    <Col>
                        <Label tag="h5">Future</Label>
                        {
                            futureLanguages.map(futureLanguage => {
                                return <Language key={futureLanguage.id}
                                    language={futureLanguage}
                                    handleManageClick={handleManageClick}
                                />
                            })
                        }
                    </Col>
                </Row>


                <Row>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle>
                            <Col sm={{ size: 'auto', offset: 1 }}>...</Col>
                        </DropdownToggle>
                        <DropdownMenu container="body">
                            <DropdownItem onClick={() => {
                                history.push("/AddLanguage")
                            }} >Add</DropdownItem>
                            <DropdownItem id="hideFlashcardCollectionButtonVisibility"
                                onClick={handleManageClick}>Manage
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Row>
            </Container>

        </>
    );
};


export default LanguageList;