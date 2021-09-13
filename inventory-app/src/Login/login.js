import React, {  useState } from 'react';
import "./login.css";
import loginimage from "./Image/img.png"
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

function Login(props) {

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const LoginPage = (e) => {
        e.preventDefault();
        console.log(email , password)
        let item = { email , password};
        axios.post('/users/signin', item,{"Content-Type" : "application/json"})
        .then(function (response) {   
            console.log("response" , response)
            localStorage.setItem("usertoken" ,JSON.stringify(response.data.token))
            props.setIsLoggedIn(localStorage.usertoken);
        })
        .catch(function (error) {
            console.log(error);
        })

    }
    
    return (
        <>
            <Container className="body">
                <div className="body-background">
                    <img className="image" src={loginimage} alt="loading error" />
                    <h2 className="heading">Member Login</h2>


                    <Form method="POST" onSubmit={LoginPage} >
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
                        <Button className="button" type="submit">
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
