import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LanguageContext } from "../../providers/LanguageProvider";
import { LanguageProficiencyContext } from "../../providers/LanguageProficiencyProvider";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';



const LanguageAdd = (props) => {

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




    return (
        <Form>
            <FormGroup>
                <Label for="examplePassword">Language</Label>
                <Input type="text" id="languageName" placeholder="language" />
            </FormGroup>

            <FormGroup>
                <Label for="exampleSelect">Proficiency</Label>
                <Input type="select" id="languageProficiencyId" onChange={handleControlledInputChange}>
                    {
                        languageProficiencies.map(languageProficiency => {
                            return <option key={languageProficiency.id}>{languageProficiency.proficiency}</option>
                        })
                    }
                </Input>
            </FormGroup>

            <Button onClick={() => handleClickAddLanguage}>Add</Button>
        </Form>
    );
};

export default LanguageAdd;