import React from 'react';
import { LanguageContext } from "../../providers/LanguageProvider.js";
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const FlashcardCollectionAdd = () => {
    const { GetUserLanguages } = useContext(LanguageContext);

    const [languages, setLanguages] = useState([]);
    const [flashcardCollection, setFlashcardCollection] = useState({
        languageId: 0,
        date: "",
        topic: "",
        //will also need to add in individual card info 
    });


    useEffect(() => {
        GetUserLanguages()
            .then(resp => setLanguages(resp))
    }, []);


    const handleControlledInputChange = (event) => {
        const newFlashcardCollection = { ...flashcardCollection }
        newFlashcardCollection[event.target.id] = event.target.value
        setFlashcardCollection(newFlashcardCollection)
    }

    const handleSaveFlashcardCollection = () => {
        addFlashcardCollection({
            date: flashcardCollection.date,
            //will also need to add in individual card info 
        })
    };


    return (
        <Form>

            <Row form>

                <Col md={4}>
                    <FormGroup row>
                        <Label for="languageSelect" sm={2}>Language</Label>
                        <Col sm={10}>
                            <Input type="select" onChange={handleControlledInputChange} id="languageId">
                                <option value="0" ></option>
                                {
                                    languages.map(language => {
                                        return (
                                            <>
                                                <option key={language.id} value={language.id} >
                                                    {language.languageName}
                                                </option>
                                            </>
                                        )
                                    })
                                }
                            </Input>
                        </Col>
                    </FormGroup>
                </Col>

                <Col md={4}>
                    <div className="form-group">
                        <label htmlFor="publishDateTime">Publish Date:</label>
                        <input
                            type="date" id="publishDateTime"
                            onChange={handleControlledInputChange}
                            requiredAutoClassName="form-control"
                            className="form-control"
                            placeholder="Publish Date"
                            value={flashcardCollection.date} />
                    </div>


                    <FormGroup>
                        <Label for="dateState">Date</Label>
                        <Input type="date" name="state" id="date" />
                    </FormGroup>
                </Col>

                <Col md={4}>
                    <FormGroup>
                        <Label for="topic">Topic</Label>
                        <Input type="text" name="topic" id="topic" />
                    </FormGroup>
                </Col>

            </Row>


            <Row>
            </Row>


            <Button>Add card</Button>
            <Button onClick={handleSaveFlashcardCollection}>Save</Button>

        </Form>
    );

    // OPTION FOR BUTTON!!
    // <Button color="primary" onClick={handleSavePost}>
    //     <Link className="savePost" to={"/Posts"} style={{ color: `#FFF` }}>
    //         Save Post
    // </Link>
    // </Button>
}

export default FlashcardCollectionAdd;