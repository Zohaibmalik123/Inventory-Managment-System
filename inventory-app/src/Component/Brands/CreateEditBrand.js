import Button from '@restart/ui/esm/Button'
import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Form, Container, Col, Row, Breadcrumb } from "react-bootstrap"
axios.defaults.baseURL='http://localhost:8000'

function CreateEditBrand() {
    const history = useHistory()
    const [brandName , setbrandName] = useState("")
    // const [BrandStatus , setBrandStatus] = useState("")

    const EnterBrand = (e) =>{
        e.preventDefault();
        let item = brandName;
        console.log(item)
    axios.post('/create/brand', item,{"Content-Type" : "application/json"})
        .then(function (response) { 
            console.log("response" , response)
            localStorage.setItem("brands" ,JSON.stringify(response.data.token))
            // props.setIsLoggedIn(localStorage.userltoken);
        })
        .catch(function (error) {
            console.log(error);
        })
        history.push('/brands')
    }
    return (
        <>
            <Container>
                <Breadcrumb className="mt-3">
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="#">Brands</Breadcrumb.Item>
                    <Breadcrumb.Item active>Create Brand</Breadcrumb.Item>
                </Breadcrumb>

                <Row className="justify-content-md-center">
                    <Col md="6">
                        <Form method="POST" onSubmit={EnterBrand} >

                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Brand Name</Form.Label>
                                <Form.Control type="text" onChange={(e)=>setbrandName(e.target.value)} placeholder="" />
                            </Form.Group>


                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Status</Form.Label>
                                <Form.Select  defaultValue="Choose...">
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </Form.Select>
                            </Form.Group>

                            <Row className="justify-content-md-center">
                                <Col>
                                    <Button variant="primary" type="submit" className="btn btn-primary mt-3 m-auto w-100" >
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default CreateEditBrand
