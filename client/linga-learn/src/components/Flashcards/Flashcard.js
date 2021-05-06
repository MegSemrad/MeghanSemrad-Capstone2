import React, { useState } from "react";
import { Card, Button, CardBody, CardFooter, Col, Container, Row } from 'reactstrap';


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

                        <div onClick={() => setFlipped(!flipped)}>🔁</div>

                    </Row>
                </CardFooter>
            </Card>



        </>
    )
};

export default Flashcard;