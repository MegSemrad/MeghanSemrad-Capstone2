import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LanguageContext } from "../../providers/LanguageProvider";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';



const LanguageAdd = (props) => {

    const history = useHistory();
    const { GetUserLanguages, AddLanguage } = useContext(LanguageContext)
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        GetUserLanguages()
            .then(resp => setLanguages(resp))
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
                <Label for="exampleSelect">Language</Label>
                <Input type="select" id="languageName" onChange={handleControlledInputChange}>
                    {
                        languages.map(language => {
                            return <option key={language.id}>{language.languageName}</option>
                        })
                    }
                </Input>
            </FormGroup>

            <FormGroup>
                <Label for="exampleSelect">Proficiency</Label>
                <Input type="select" id="languageProficiencyId" onChange={handleControlledInputChange}>
                    <option>1</option>
                </Input>
            </FormGroup>

            <Button onClick={() => handleClickAddLanguage}>Add</Button>
        </Form>
    );
};

export default LanguageAdd;