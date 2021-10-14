import Button from '@restart/ui/esm/Button'
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {Form, Container, Col, Row, Breadcrumb} from "react-bootstrap"
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import {useParams} from "react-router-dom";

axios.defaults.baseURL = 'http://localhost:8000'

function CreateEditBrand(props) {
    const [brandsData, setBrandsData] = useState({
        brandName: null,
        brandStatus: null,
        categoryId:null
    });
    const [brandName] = useState("")
    const [category , setCategory] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertTitle, setShowAlertTitle] = useState("")
    const [showAlertText, setShowAlertText] = useState("")

    const {id} = useParams();

    useEffect(() => {
            axios.get(`/get-brand/${id}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.usertoken}`
                }
            })
                .then(function (response) {
                    // console.log(response.categoryName)
                    if (!brandsData.brandName && !brandsData.brandStatus && !brandsData.categoryId) {
                        setBrandsData({brandName: response.data.brandName, brandStatus: response.data.brandStatus , categoryId: response.data.category[0]?._id});
                        // console.log(response.data)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        axios.get('/get-all-category' , {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.usertoken}`
            }
        })
            .then(function (response){
                setCategory(response.data)
            })
            .catch(function (error){
                console.log(error)
            })

    }, [])

    const SubmitBrand = (e) => {
        e.preventDefault();
        if (id)
            brandUpdate();
        else
            EnterBrand();

    }

    const EnterBrand = () => {
        if (brandsData.brandName && brandsData.brandStatus && brandsData.categoryId) {
            axios.post('/create/brand', brandsData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.usertoken}`
                    }
                })
                .then(function (response) {
                    setShowAlertText("Brand is successfully created")
                    setShowAlertTitle("Success")
                    setShowAlert(true)
                })
                .catch((error) => {
                    if (error.response?.status === 401) {
                        props.logout();
                    } else {
                        setShowAlertText("Failed to create Brand.")
                        setShowAlertTitle("Error")
                        setShowAlert(true)
                    }
                })
        }
    }
    const BrandsData = (e) => {
        const {value} = e.target
        setBrandsData({...brandsData, brandName: value})
    }
    const BrandData = (e) => {
        const {value} = e.target
        setBrandsData({...brandsData, brandStatus: value})
    }
    const Category= (e)=>{
        const {value} = e.target
        setBrandsData({...brandsData , categoryId: value})
    }



    const brandUpdate = () => {
        if (brandsData.brandName && brandsData.brandStatus && brandsData.categoryId) {
            axios.patch(`/brand/update/${id}`, brandsData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.usertoken}`
                    }
                })
                .then(function (response) {
                    setBrandsData(response.data)
                    setShowAlertText("Brand is successfully updated")
                    setShowAlertTitle("Success")
                    setShowAlert(true)
                })
                .catch((error) => {
                    if (error.response?.status === 401) {
                        props.logout();
                    } else {
                        setShowAlertText("Failed to update Brand.")
                        setShowAlertTitle("Error")
                        setShowAlert(true)
                    }
                })
        } else {
            console.log("field is empty")
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
                    <Breadcrumb.Item href="/brands">Brands</Breadcrumb.Item>
                    <Breadcrumb.Item active>Create Brand</Breadcrumb.Item>
                </Breadcrumb>

                <Row className="justify-content-md-center">
                    <Col md="6">
                        <Form method="POST" onSubmit={SubmitBrand}>

                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Brand Name</Form.Label>
                                <Form.Control type="text" value={brandsData.brandName} onChange={BrandsData}
                                              placeholder=""/>

                            </Form.Group>


                            <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Categories</Form.Label>
                            <Form.Select value={brandsData.categoryId} onChange={Category} defaultValue="Choose...">
                                <option value="">Select Category</option>
                                {category.map((row) => {
                                    // console.log(row._id)
                                    return (
                                        <>
                                        <option value={row._id}>{row.categoryName}</option>
                                        {row.subCategories.map((row) => {
                                            // console.log(row._id)
                                            return (
                                                <>
                                                    <option value={row._id}>&nbsp;&nbsp;&nbsp;&nbsp;{row.categoryName}</option>
                                                    {row.subCategories.map((row) => {
                                                        // console.log(row._id)
                                                        return (
                                                            <option value={row._id}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{row.categoryName}</option>

                                                        );
                                                    })}
                                                </>
                                            );
                                        })}
                                        </>
                                    );
                                })}
                            </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Status</Form.Label>
                                <Form.Select defaultValue="Choose..." value={brandsData.brandStatus}
                                             onChange={BrandData}>
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

export default CreateEditBrand
