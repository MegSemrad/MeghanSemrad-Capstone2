import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { LanguageContext } from "../../providers/LanguageProvider.js";
import Language from "./Language.js";
import {
    Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
    Label, Row
} from 'reactstrap';



const LanguageList = (props) => {
    const history = useHistory();
    const { getUserLanguages } = useContext(LanguageContext);
    const [languages, setLanguages] = useState([]);
    const [knownLanguages, setKnownLanguages] = useState([]);
    const [learningLanguages, setLearningLanguages] = useState([]);
    const [futureLanguages, setFutureLanguages] = useState([]);


    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);


    useEffect(() => {
        getUserLanguages()
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