import React, { useContext, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { LanguageContext } from "../../providers/LanguageProvider";
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Language from '../Languages/Language';

const Example = (props) => {
    const { getLanguageById } = useContext(LanguageContext);
    const { getResourceTypes } = useContext(ResourceTypeContext);
    const { LanguageId } = useParams();
    const [language, setLanguage] = useState({});
    const [resourceTypes, setResourceTypes] = useState([]);

    useEffect(() => {
        getLanguageById(LanguageId)
            .then(languageObject => setLanguage(languageObject))
        getResourceTypes()
            .then(resourceTypeArray => setResourceTypes(resourceTypeArray))
    }, []);




    return (
        <>
            <Label>Looks like you have no resources for {language.languageName}. Add some now!</Label>
            <Form>
                <FormGroup row>
                    <Label for="exampleEmail" sm={2}>Online</Label>
                    <Col sm={10}>
                        <Input type="email" name="email" id="exampleEmail" />
                    </Col>
                </FormGroup>

                <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2 }}>
                        <Button>Save</Button>
                    </Col>
                </FormGroup>
            </Form>
        </>
    );
}

export default Example;
