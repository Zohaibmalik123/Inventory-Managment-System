
import React, {useState} from 'react'
import {Form ,Container, Col , Row ,Button , Breadcrumb} from 'react-bootstrap'
import axios from "axios";
import 'sweetalert/dist/sweetalert.css';
import SweetAlert from "sweetalert-react";
axios.defaults.baseURL='http://localhost:8000'

function CategoryEdit(props) {

    const [categoryName , setCategoryName] = useState("")
    const [categoryStatus , setCategoryStatus] = useState("")
    const [showAlert , setShowAlert] = useState(false)
    const [showAlertTitle , setShowAlertTitle] = useState("")
    const [showAlertText , setShowAlertText] = useState("")


    const EnterCategory = (e) =>{
        e.preventDefault();
        let item = { categoryName , categoryStatus };
        axios.post('/create/category', item,
            {headers: {
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${localStorage.usertoken}`
                }})
            .then(function (response) {
                setShowAlertText("Category is successfully created")
                setShowAlertTitle("Success")
                setShowAlert(true)
                setCategoryName("")
                setCategoryStatus("")
            })
            .catch( (error) => {
                if(error.response?.status == 401){
                    props.logout();
                }else {
                    setShowAlertText("Failed to create Category.")
                    setShowAlertTitle("Error")
                    setShowAlert(true)
                }
            })
    }
    return (
        <>
                <SweetAlert
                    show={showAlert}
                    title={showAlertTitle}
                    text={showAlertText}
                    onConfirm={() => setShowAlert(false)}
                />

            <Container>
                <Breadcrumb className="mt-3">
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="#">Category</Breadcrumb.Item>
                    <Breadcrumb.Item active>Create Category</Breadcrumb.Item>
                </Breadcrumb>

                <Row className="justify-content-md-center">
                    <Col md="6">
                        <Form method="POST" onSubmit={EnterCategory} >

                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Category Name</Form.Label>
                                <Form.Control type="text" value={categoryName} onChange={(e)=>setCategoryName(e.target.value)} placeholder="" />
                            </Form.Group>


                            <Form.Group as={Col}  controlId="formGridState">
                                <Form.Label>Status</Form.Label>
                                <Form.Select  defaultValue="Choose...">
                                    <option value={categoryStatus} onChange={(e)=>setCategoryStatus(e.target.value)}>Active</option>
                                    <option>Inactive</option>
                                </Form.Select>
                            </Form.Group>

                            <Row className="justify-content-md-center">
                                <Col>
                                    <Button variant="primary" type="submit" className="btn btn-primary mt-3 m-auto w-100">
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

export default CategoryEdit
