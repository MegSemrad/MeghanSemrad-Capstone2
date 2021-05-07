import React, { useState } from "react";
import { Button, Card, CardBody, CardFooter, Row } from 'reactstrap';


const Flashcard = ({ flashcard, handleSwitchToKnowIt, handleSwitchToStudyIt }) => {
    const [flipped, setFlipped] = useState(true);

    return (
        <>
            <Card key={flashcard.id}>
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