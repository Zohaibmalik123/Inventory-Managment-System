import React, {useEffect, useState} from 'react'
import {Form , Col , Row , Button , Container , Breadcrumb} from 'react-bootstrap'
import axios from "axios";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import {Link} from "react-router-dom";
axios.defaults.baseURL='http://localhost:8000'

function ProductsCreateEdit(props) {


    const [brandId , setBrandId] = useState("")
    const [productName , setProductName] = useState("")
    const [categoryId , setCategoryId] = useState("")
    const [quantity , setQuantity] = useState("")
    const [rate , setRate] = useState("")
    const [productStatus , setProductStatus] = useState("")
    const [showAlert , setShowAlert] = useState(false)
    const [showAlertTitle , setShowAlertTitle] = useState("")
    const [showAlertText , setShowAlertText] = useState("")
    const [brands, setBrands] = useState([]);
    const [category, setCategory] = useState([]);
    useEffect(() => {
        axios.get('/get-brands')
            .then(function (response) {
                setBrands(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
        axios.get('/get-category')
            .then(function (response) {
                setCategory(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])


    const createProduct = (e) =>{
        e.preventDefault();
        let item = { brandId , productName , categoryId , quantity , rate , productStatus };
        axios.post('/create/product', item,
            { headers : {"Content-Type" : "application/json",
                    Authorization : `Bearer ${localStorage.usertoken}`
                }})
            .then(function (response) {
                setShowAlertText("Product is successfully created")
                setShowAlertTitle("Success")
                setShowAlert(true)
                setBrandId("")
                setProductName("")
                setCategoryId("")
                setQuantity("")
                setRate("")
                if( productStatus===productStatus){
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
                                <Form.Label> Brand_Name</Form.Label>
                                <Form.Select   value={brandId} onChange={(e)=>setBrandId(e.target.value)} defaultValue="Choose...">
                                    <option value="">Select Brand</option>
                                    { brands.map((row, index) => {
                                        return(
                                            <option value={row._id}>{row.brandName}</option>
                                        );
                                    })}
                                </Form.Select>
                                <Form.Label>Category_Name</Form.Label>
                                <Form.Select   value={categoryId} onChange={(e)=>setCategoryId(e.target.value)} defaultValue="Choose...">
                                    <option value="">Select Category</option>
                                    { category.map((row, index) => {
                                        return(
                                            <option value={row._id}>{row.categoryName}</option>
                                        );
                                    })}
                                </Form.Select>
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
