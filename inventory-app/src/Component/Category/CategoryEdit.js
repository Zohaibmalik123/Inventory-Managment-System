
import React, {useEffect, useState} from 'react'
import {Form ,Container, Col , Row ,Button , Breadcrumb} from 'react-bootstrap'
import axios from "axios";
import 'sweetalert/dist/sweetalert.css';
import SweetAlert from "sweetalert-react";
import {useParams , useHistory} from "react-router-dom";
axios.defaults.baseURL='http://localhost:8000'

function CategoryEdit(props) {
    const history = useHistory()
    const [categoryData , setCategoryData] = useState({
        categoryName : null,
        categoryStatus:null
    })

    const [categoryName , setCategoryName] = useState("")
    const [categoryStatus , setCategoryStatus] = useState("")
    const [showAlert , setShowAlert] = useState(false)
    const [showAlertTitle , setShowAlertTitle] = useState("")
    const [showAlertText , setShowAlertText] = useState("")

    const {id} = useParams()
    useEffect(() => {
        axios.get(`/get-category/${id}`)
            .then(function (response) {
                console.log(response.data)
                if (!categoryData.categoryName && !categoryData.categoryStatus) {
                    setCategoryData({categoryName: response.data.categoryName, categoryStatus: response.data.categoryStatus});
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    },[])

    const CategoryUpdate = (e)=>{
        const {value} = e.target
        setCategoryData({...categoryData, categoryName: value})
    }
    const UpdateCategoryStatus = (e)=>{
        const {value} = e.target
        setCategoryData({...categoryData, categoryStatus: value})
    }

    const UpdateCategory =(e)=>{
        e.preventDefault()
        if(categoryData.categoryName && categoryData.categoryStatus){
            axios.patch(`/category/update/${id}`, categoryData,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(function (response) {
                    setCategoryData(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
            history.push("/category")
        }else{
            console.log("field is empty")
        }
    }

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
                categoryData(categoryName)
                if( categoryStatus===categoryStatus){
                    setCategoryStatus(categoryStatus)
                }

            })
            .catch( (error) => {
                if(error.response?.status === 401){
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
                                <Form.Control type="text" value={categoryData.categoryName} onChange={CategoryUpdate} placeholder="" />
                            </Form.Group>


                            <Form.Group as={Col}  controlId="formGridState">
                                <Form.Label>Status</Form.Label>
                                <Form.Select  value={categoryData.categoryStatus} onChange={UpdateCategoryStatus}  defaultValue="Choose...">
                                        <option >Action</option>
                                        <option >Active</option>
                                    <option>Inactive</option>

                                </Form.Select>
                            </Form.Group>

                            <Row className="justify-content-md-center">
                                <Col>
                                    <Button variant="primary" onClick={UpdateCategory} type="submit" className="btn btn-primary mt-3 m-auto w-100">
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
