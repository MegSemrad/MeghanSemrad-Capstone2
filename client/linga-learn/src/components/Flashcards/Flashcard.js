import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, CardBody, CardFooter, CardHeader, Row } from 'reactstrap';


const Flashcard = ({ flashcard, handleSwitchToKnowIt, handleSwitchToStudyIt }) => {
    const history = useHistory();
    const [flipped, setFlipped] = useState(true);



    return (
        <>
            <Card key={flashcard.id} className="flashcardCard">
                <CardHeader className="flashcardCardHeader">
                    <Button
                        close
                        outline
                        onClick={() => {
                            history.push(`/Manage/${flashcard.id}`)
                        }}><span aria-hidden className="flashcardEditButton">✏</span></Button>
                </CardHeader>
                <CardBody className="flashcardCardBodyWord">
                    {flipped ?
                        flashcard.word
                        : flashcard.translatedWord}
                </CardBody>
                <CardFooter>
                    <Row className="flashcardButtons">
                        <Button
                            outline
                            close
                            onClick={() => handleSwitchToStudyIt(flashcard)}><span aria-hidden>◀</span></Button>
                        <Button
                            outline
                            close
                            onClick={() => setFlipped(!flipped)}><span aria-hidden>🔁</span></Button>
                        <Button
                            outline
                            close
                            onClick={() => handleSwitchToKnowIt(flashcard)}><span aria-hidden>▶</span></Button>
                    </Row>
                </CardFooter>
            </Card>
        </>
    );
};

export default Flashcard;