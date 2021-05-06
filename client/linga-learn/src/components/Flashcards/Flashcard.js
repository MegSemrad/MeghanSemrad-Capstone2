import React, { useState } from "react";
import { Card, CardBody, CardFooter, Row } from 'reactstrap';


const Flashcard = ({ flashcard }) => {
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
                        <div>◀</div>
                        <div onClick={() => setFlipped(!flipped)}>🔁</div>
                        <div>▶</div>
                    </Row>
                </CardFooter>
            </Card>



        </>
    )
};

export default Flashcard;