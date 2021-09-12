import React, { useState , useHistory } from 'react';
import "./login.css";
import loginimage from "./Image/img.png"
import { Link } from 'react-router-dom';
// import axios from 'axios';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

function Login() {

    // const history = useHistory();

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    async function LoginPage() {
        console.warn(email , password)
        let item = { email , password};
        let result = await fetch("http://localhost:8000/users/signin" , {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(item)
        });

        result = await result.json();
        localStorage.setItem("user-info" ,JSON.stringify(result))
        // history.push('/');

    }

    // useEffect(() => {
    //     return () => {
    //         LoginPage()
    //     }
    // }, [])

    
    return (
        <>
            <Container className="body">
                <div className="body-background">
                    <img className="image" src={loginimage} alt="loading error" />
                    <h2 className="heading">Member Login</h2>


                    <Form method="POST" >
                        <Form.Group as={Row} className="mb-3 , lableform" controlId="formBasicEmail">

                            <Col sm="4">
                                <Form.Control type="email" onChange={(e)=>setEmail(e.target.value)}  placeholder="Username" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3 , lableform" controlId="formBasicPassword">

                            <Col sm="4">
                                <Form.Control type="password"  onChange={(e)=>setPassword(e.target.value )}  placeholder="Password" />
                            </Col>
                            <Link className="forget" to="#">Forgotten password</Link>

                        </Form.Group>
                        <Button className="button" type="submit" onClick={LoginPage}>
                            Login
                        </Button>
                        <Button className="button" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </div>
            </Container>
        </>
    )
}

export default Login
