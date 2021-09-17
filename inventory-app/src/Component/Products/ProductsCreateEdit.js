import React, {useState} from 'react'
import {Form , Col , Row , Button , Container , Breadcrumb} from 'react-bootstrap'
import axios from "axios";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
axios.defaults.baseURL='http://localhost:8000'

function ProductsCreateEdit(props) {


    const [brandName , setBrandName] = useState("")
    const [productName , setProductName] = useState("")
    const [categoryName , setCategoryName] = useState("")
    const [quantity , setQuantity] = useState("")
    const [rate , setRate] = useState("")
    const [productStatus , setProductStatus] = useState("")
    const [showAlert , setShowAlert] = useState(false)
    const [showAlertTitle , setShowAlertTitle] = useState("")
    const [showAlertText , setShowAlertText] = useState("")


    const createProduct = (e) =>{
        e.preventDefault();
        let item = { brandName , productName , categoryName , quantity , rate , productStatus };
        axios.post('/create/product', item,
            { headers : {"Content-Type" : "application/json",
                    Authorization : `Bearer ${localStorage.usertoken}`
                }})
            .then(function (response) {
                setShowAlertText("Product is successfully created")
                setShowAlertTitle("Success")
                setShowAlert(true)
                setBrandName("")
                setProductName("")
                setCategoryName("")
                setQuantity("")
                setRate("")
                if( productStatus===productStatus){
                    setProductStatus(productStatus)
                }else{
                    setProductStatus(productStatus)
                }
            })
            .catch( (error) => {
                if(error.response?.status == 401){
                    props.logout();
                }else {
                    setShowAlertText("Failed to product Brand.")
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
                    <Breadcrumb.Item href="#">Products</Breadcrumb.Item>
                    <Breadcrumb.Item active>Create Products</Breadcrumb.Item>
                </Breadcrumb>

                <Row className="justify-content-md-center">
                    <Col md="6">
                        <Form method="POST" onSubmit={createProduct}>

                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label> Product Name</Form.Label>
                                <Form.Control type="text" value={productName} onChange={(e)=>setProductName(e.target.value)} placeholder="" />
                                <Form.Label> Quantity</Form.Label>
                                <Form.Control type="number" value={quantity} onChange={(e)=>setQuantity(e.target.value)} placeholder="" />
                                <Form.Label> Rate</Form.Label>
                                <Form.Control type="number" value={rate} onChange={(e)=>setRate(e.target.value)} placeholder="" />
                                <Form.Label> Brand Name</Form.Label>
                                <Form.Control type="text" value={brandName} onChange={(e)=>setBrandName(e.target.value)} placeholder="" />
                                <Form.Label>Category</Form.Label>
                                <Form.Control type="text" value={categoryName} onChange={(e)=>setCategoryName(e.target.value)} placeholder="" />
                            </Form.Group>
                            


                            <Form.Group value={productStatus} onChange={(e)=>setProductStatus(e.target.value)} as={Col} controlId="formGridState">
                                <Form.Label>Status</Form.Label>
                                <Form.Select defaultValue="Choose...">
                                    <option>Action</option>
                                    <option>Active</option>
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

export default ProductsCreateEdit
