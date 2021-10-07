import React, {useEffect, useState} from 'react'
import {Form , Col , Row , Button , Container , Breadcrumb} from 'react-bootstrap'
import axios from "axios";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import {useParams} from "react-router-dom";
axios.defaults.baseURL='http://localhost:8000'

function ProductsCreateEdit(props) {

    const [productData, setProductData] = useState({
        productName: null,
        quantity: null,
        rate:null,
        productStatus:null,
        brandId:null,
        categoryId:null
    })

    const [showAlert, setShowAlert] = useState(false)
    const [showAlertTitle, setShowAlertTitle] = useState("")
    const [showAlertText, setShowAlertText] = useState("")
    const [brands, setBrands] = useState([]);
    const [category, setCategory] = useState([]);


    useEffect(() => {
        axios.get('/get-brands', {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.usertoken}`
            }
        })
            .then(function (response) {
                setBrands(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
        axios.get('/get-category', {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.usertoken}`
            }
        })

            .then(function (response) {
                setCategory(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    const {id} = useParams()
    useEffect(() => {
            axios.get(`/get-products/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.usertoken}`
                }
            })
                .then(function (response) {
                    console.log(response.data)
                    if (!productData.productName && !productData.quantity && !productData.rate && !productData.productStatus && !productData.brandId) {
                        setProductData({productName: response.data.productName, quantity: response.data.quantity, rate: response.data.rate
                            , productStatus: response.data.productStatus , brandId: response.data.brand?._id , categoryId: response.data.category?._id});
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
    }, [])

    const SubmitProduct= (e) => {
        e.preventDefault()
        if (id)
            UpdateProduct()
        else
            CreateProduct()
    }

    const UpdateProduct = () => {
        if (productData.productName && productData.productStatus && productData.rate && productData.quantity && productData.brandId) {
            axios.patch(`/product/update/${id}`, productData,{

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.usertoken}`
                }
            })
                .then(function (response) {
                    setProductData(response.data)

                    setShowAlertText("Product is successfully updated")
                    setShowAlertTitle("Success")
                    setShowAlert(true)
                })
                .catch((error) => {
                    if (error.response?.status === 401) {
                        props.logout();
                    } else {
                        setShowAlertText("Failed to update Product.")
                        setShowAlertTitle("Error")
                        setShowAlert(true)
                    }
                })
        } else {
            setShowAlertText("Required fields are missing.")
            setShowAlertTitle("Error")
            setShowAlert(true)
        }
    }

    const ProductNameData = (e) => {
        const {value} = e.target
        setProductData({...productData, productName: value})
    }
    const ProductQuantity = (e) => {
        const {value} = e.target
        setProductData({...productData, quantity: value})
    }
    const ProductRate= (e) => {
        const {value} = e.target
        setProductData({...productData, rate: value})
    }
    const Status= (e) => {
        const {value} = e.target
        setProductData({...productData, productStatus: value})
    }
    const BrandId= (e) => {
        const {value} = e.target
        setProductData({...productData, brandId: value})
    }
    const CategoryId= (e) => {
        const {value} = e.target
        setProductData({...productData, categoryId: value})
    }



    const CreateProduct = () => {
        if (productData.productName && productData.productStatus && productData.rate && productData.quantity && productData.brandId && productData.categoryId){
        axios.post('/create/product', productData,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.usertoken}`
                }
            })
            .then(function (response) {
                setShowAlertText("Product is successfully created")
                setShowAlertTitle("Success")
                setShowAlert(true)
            })
            .catch((error) => {
                if (error.response?.status === 401) {
                    props.logout();
                } else {
                    setShowAlertText("Failed to product Brand.")
                    setShowAlertTitle("Error")
                    setShowAlert(true)
                }
            })
        }
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
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="/product">Products</Breadcrumb.Item>
                        <Breadcrumb.Item active>Create Products</Breadcrumb.Item>
                    </Breadcrumb>

                    <Row className="justify-content-md-center">
                        <Col md="6">
                            <Form method="POST" onSubmit={SubmitProduct}>

                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label> Product Name</Form.Label>
                                    <Form.Control type="text" value={productData.productName} onChange={ProductNameData}
                                                  placeholder=""/>
                                    <Form.Label> Quantity</Form.Label>
                                    <Form.Control type="number" value={productData.quantity} onChange={ProductQuantity}
                                                  placeholder=""/>
                                    <Form.Label> Rate</Form.Label>
                                    <Form.Control type="number" value={productData.rate}
                                                  onChange={ProductRate} placeholder=""/>
                                    <Form.Label> Brand_Name</Form.Label>
                                    <Form.Select value={productData.brandId} onChange={BrandId}> defaultValue="Choose...">
                                        <option value="">Select Brand</option>
                                        {brands.map((row) => {
                                            return (
                                                <option value={row._id}>{row.brandName}</option>
                                            );
                                        })}
                                    </Form.Select>
                                    <Form.Label>Category_Name</Form.Label>
                                    <Form.Select value={productData.categoryId} onChange={CategoryId}
                                                 defaultValue="Choose...">
                                        <option value="">Select Category</option>
                                        {category.map((row) => {
                                            return (
                                                <option value={row._id}>{row.categoryName}</option>
                                            );
                                        })}
                                    </Form.Select>
                                </Form.Group>


                                <Form.Group controlId="formGridState">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select value={productData.productStatus}
                                                 onChange={Status} as={Col}
                                                 defaultValue="Choose...">
                                        <option>Action</option>
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </Form.Select>
                                </Form.Group>

                                <Row className="justify-content-md-center">
                                    <Col>
                                        <Button variant="primary" type="submit"
                                                className="btn btn-primary mt-3 m-auto w-100">
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
