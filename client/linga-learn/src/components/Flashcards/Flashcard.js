import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, CardBody, CardFooter, CardHeader, Row } from 'reactstrap';


const Flashcard = ({ flashcard, handleSwitchToKnowIt, handleSwitchToStudyIt }) => {
    const history = useHistory();
    const [flipped, setFlipped] = useState(true);



    return (
        <>
            <Card key={flashcard.id}>
                <CardHeader>
                    <div onClick={() => {
                        history.push(`/Manage/${flashcard.id}`)
                    }}>✏</div>
                </CardHeader>
                <CardBody>
                    {flipped ?
                        flashcard.word
                        : flashcard.translatedWord}

                </CardBody>
                <CardFooter>
                    <Row>
                        <Button onClick={() => handleSwitchToStudyIt(flashcard)}>◀</Button>
                        <Button onClick={() => setFlipped(!flipped)}>🔁</Button>
                        <Button onClick={() => handleSwitchToKnowIt(flashcard)}>▶</Button>
                    </Row>
                </CardFooter>
            </Card>



        </>
    )
};

export default Flashcard;