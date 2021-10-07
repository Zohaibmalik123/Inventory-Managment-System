import React, {useEffect, useState} from 'react'
import {Form, Container, Col, Row, Button, Breadcrumb} from 'react-bootstrap'
import axios from "axios";
import 'sweetalert/dist/sweetalert.css';
import SweetAlert from "sweetalert-react";
import {useParams} from "react-router-dom";

axios.defaults.baseURL = 'http://localhost:8000'

function CategoryEdit(props) {
    const [categoriesData, setCategoriesData] = useState({
        categoryName: null,
        mainCategoryId: null,
        subCategoryId: null,
        categoryStatus: null
    })


    const [showAlert, setShowAlert] = useState(false)
    const [showAlertTitle, setShowAlertTitle] = useState("")
    const [showAlertText, setShowAlertText] = useState("")
    const [categories, setCategories] = useState([]);


    const {id} = useParams()
    useEffect(() => {
        if (id) {
            axios.get(`/get-single-category/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.usertoken}`
                }
            })
                .then(function (response) {
                    console.log(response.data)
                    if (!categoriesData.categoryName && !categoriesData.categoryStatus) {
                        console.log("Response", response.data)

                        console.log("Name:", response.data.categoryName)
                        setCategoriesData({
                            categoryName: response.data.categoryName,
                            categoryStatus: response.data.categoryStatus
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        getMainCategories()
    }, [])


    function getMainCategories () {
        axios.get('/get-main-categories-with-sub-categories', {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.usertoken}`
            }
        }).then(function (response) {
            console.log(response.data)
            setCategories(response.data);
        })
            .catch(function (error) {
                console.log(error);
            })
    }


    const SubmitCategory = (e) => {
        e.preventDefault()
        if (id){
            UpdateCategory()
        }else{

            EnterCategory()
        }

    }
    const updateCategoryName = (e) => {
        const {value} = e.target
        setCategoriesData({...categoriesData, categoryName: value})
    }
    const updateMainCategoryId = (e) => {
        const {value} = e.target
        setCategoriesData({...categoriesData, mainCategoryId: value})
    }
    const updateSubCategoryId = (e) => {
        const {value} = e.target
        setCategoriesData({...categoriesData, subCategoryId: value})
    }
    const UpdateCategoryStatus = (e) => {
        const {value} = e.target
        setCategoriesData({...categoriesData, categoryStatus: value})
    }

    const UpdateCategory = () => {
        if (categoriesData.categoryName && categoriesData.categoryStatus) {
            axios.patch(`/category/update/${id}`, categoriesData, {

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.usertoken}`
                }
            })
                .then(function (response) {
                    setCategoriesData(response.data)

                    setShowAlertText("Category is successfully updated")
                    setShowAlertTitle("Success")
                    setShowAlert(true)
                })
                .catch((error) => {
                    if (error.response?.status === 401) {
                        props.logout();
                    } else {
                        setShowAlertText("Failed to update Category.")
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

    const EnterCategory = () => {
        if (categoriesData.categoryName && categoriesData.categoryStatus) {
            axios.post('/create-category', categoriesData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.usertoken}`
                    }
                })
                .then(function (response) {
                    console.log(response.data)
                    setShowAlertText("Category is successfully created")
                    setShowAlertTitle("Success")
                    setShowAlert(true)
                    getMainCategories()
                })
                .catch((error) => {
                    if (error.response?.status === 401) {
                        props.logout();
                    } else {
                        setShowAlertText("Failed to create Category.")
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
                    <Breadcrumb.Item href="/category">Category</Breadcrumb.Item>
                    <Breadcrumb.Item active>Create category</Breadcrumb.Item>
                </Breadcrumb>

                <Row className="justify-content-md-center">
                    <Col md="6">
                        <Form method="POST" onSubmit={SubmitCategory}>

                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Category Name</Form.Label>
                                <Form.Control type="text" value={categoriesData.categoryName} onChange={updateCategoryName}
                                              placeholder=""/>
                            </Form.Group>



                            <Form.Label>Main category</Form.Label>
                            <Form.Select value={categoriesData.mainCategoryId} onChange={updateMainCategoryId}
                                         defaultValue="Choose...">
                                <option value="">Select Category</option>
                                {categories.map((row) => {
                                    return (
                                        <option value={row._id}>{row.categoryName}</option>
                                    );
                                })}
                            </Form.Select>

                            {categoriesData.mainCategoryId && (
                                <>
                                    <Form.Label>Sub category</Form.Label>
                                    <Form.Select value={categoriesData.subCategoryId} onChange={updateSubCategoryId}
                                                 defaultValue="Choose...">
                                        <option value="">Select Category</option>
                                        {categories.map((row) => {
                                            if(row._id === categoriesData.mainCategoryId){
                                                return row.subCategories.map((subCategory) => {
                                                    return (
                                                        <option value={subCategory._id}>{subCategory.categoryName}</option>
                                                    );
                                                })
                                            }
                                        })}
                                    </Form.Select>
                                </>
                            )}


                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Status</Form.Label>
                                <Form.Select value={categoriesData.categoryStatus} onChange={UpdateCategoryStatus}
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

export default CategoryEdit
