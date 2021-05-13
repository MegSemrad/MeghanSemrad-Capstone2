import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button, Card, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { UserContext } from "../providers/UserProvider";

export default function Login() {
    const history = useHistory();
    const { login } = useContext(UserContext);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginSubmit = (e) => {
        e.preventDefault();
        login(email, password)
            .then(() => history.push("/"))
            .catch(() => alert("Invalid email or password"));
    };

    return (
        <Container>
            <Card className="loginCard">
                <Form onSubmit={loginSubmit}>
                    <fieldset>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Button>Login</Button>
                        </FormGroup>
                        <em>
                            Not registered? <Link to="/register">Register</Link>
                        </em>
                    </fieldset>
                </Form>
            </Card>
        </Container>
    );
};