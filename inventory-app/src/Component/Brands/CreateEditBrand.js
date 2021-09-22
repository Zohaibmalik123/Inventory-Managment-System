import Button from '@restart/ui/esm/Button'
import React, {useEffect, useState } from 'react'
import axios from 'axios';
import { Form, Container, Col, Row, Breadcrumb } from "react-bootstrap"
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
// import queryString from "querystring";
import {useParams} from "react-router-dom";
axios.defaults.baseURL='http://localhost:8000'

function CreateEditBrand(props) {
    const [brandsData, setBrandsData] = useState({
        brandName:null,
        brandStatus:null,
    });
    /**
     * setBrandsData({
     *     setBrandName: name,
     *     setBrandStatus: status
     * });
     * setBrandsData({
     *     setBrandName: name,
     * });
     * */
    const [brandName , setBrandName] = useState("")
    const [brandStatus , setBrandStatus] = useState("")
    const [showAlert , setShowAlert] = useState(false)
    const [showAlertTitle , setShowAlertTitle] = useState("")
    const [showAlertText , setShowAlertText] = useState("")

    const {id} = useParams();

        useEffect(() => {
            // const url = window.location.href;
            // const urlTokens = url.split("/");
            // const brandId = urlTokens[urlTokens.length-1];

            axios.get(`/get-brand/${id}`)
                .then(function (response) {
                    console.log(response.data)
                    // setBrands(response.data)
                    // console.log(setBrands)

                    if(!brandsData.brandName && !brandsData.brandStatus) {
                        setBrandsData({brandName:response.data.brandName, brandStatus:response.data.brandStatus});
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        })


    const EnterBrand = (e) =>{
        e.preventDefault();
        let item = { brandName , brandStatus   };
    axios.post('/create/brand', item,
        { headers : {"Content-Type" : "application/json",
            Authorization : `Bearer ${localStorage.usertoken}`
        }})
        .then(function (response) {
            setShowAlertText("Brand is successfully created")
            setShowAlertTitle("Success")
            setShowAlert(true)
            setBrandName("")
            if( brandStatus===brandStatus){
                setBrandStatus(brandStatus)
            }

        })
        .catch( (error) => {
            if(error.response?.status == 401){
                props.logout();
            }else {
                setShowAlertText("Failed to create Brand.")
                setShowAlertTitle("Error")
                setShowAlert(true)
            }
        })
    }

    const BrandsData = (event) =>{
        console.log(event.target.value)
        setBrandsData(event.target.value)
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





                            <Form.Group as={Col}   value={brandStatus} onChange={(e)=>setBrandStatus(e.target.value)}controlId="formGridState">
                                <Form.Label>Status</Form.Label>
                                <Form.Select  defaultValue="Choose...">
                                    <option>Action</option>
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
