import Button from '@restart/ui/esm/Button'
import React, {useEffect, useState} from 'react'
import  {useHistory} from "react-router-dom";
import axios from 'axios';
import { Form, Container, Col, Row, Breadcrumb } from "react-bootstrap"
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import {useParams} from "react-router-dom";
axios.defaults.baseURL='http://localhost:8000'

function CreateEditBrand(props) {
    const history = useHistory()
    const [brandsData, setBrandsData] = useState({
        brandName: null,
        brandStatus: null,
    });

    const [brandName] = useState("")
    const [brandStatus] = useState("")
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertTitle, setShowAlertTitle] = useState("")
    const [showAlertText, setShowAlertText] = useState("")

    const {id} = useParams();

    useEffect(() => {
        axios.get(`/get-brand/${id}`)
            .then(function (response) {
                console.log(response.data)
                if (!brandsData.brandName && !brandsData.brandStatus) {
                    setBrandsData({brandName: response.data.brandName, brandStatus: response.data.brandStatus});
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    },[])


    const EnterBrand = (e) => {
        e.preventDefault();
        let item = {brandName, brandStatus};
        axios.post('/create/brand', item,
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
                setBrandsData({brandName: brandName})
                if (brandStatus === brandStatus) {
                    setBrandsData(brandStatus)
                }

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
    const BrandsData = (e) => {
        const {value} = e.target
        setBrandsData({...brandsData, brandName : value})
    }
    const BrandData = (e) => {
        const {value} = e.target
        setBrandsData({...brandsData, brandStatus : value})
    }


    const brandUpdate = (e) => {
        e.preventDefault()
        if(brandsData.brandName && brandsData.brandStatus){
            axios.patch(`/brand/update/${id}`, brandsData,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(function (response) {
                    setBrandsData(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
            history.push("/brands")
        }else{
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
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="#">Brands</Breadcrumb.Item>
                    <Breadcrumb.Item active>Create Brand</Breadcrumb.Item>
                </Breadcrumb>

                <Row className="justify-content-md-center">
                    <Col md="6">
                        <Form method="POST" onSubmit={EnterBrand} >

                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Brand Name</Form.Label>
                                <Form.Control type="text" value={brandsData.brandName} onChange={BrandsData} placeholder="" />

                            </Form.Group>
                            <Form.Group as={Col}   value={brandsData.brandStatus} onChange={BrandData}controlId="formGridState">
                                <Form.Label>Status</Form.Label>
                                <Form.Select  defaultValue="Choose...">
                                    <option>Action</option>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </Form.Select>
                            </Form.Group>

                            <Row className="justify-content-md-center">
                                <Col>
                                    <Button variant="primary" type="submit"  onClick={brandUpdate} className="btn btn-primary mt-3 m-auto w-100" >
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
