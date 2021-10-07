import React, {useEffect, useState} from 'react'
import {Table, Container, Breadcrumb, Col,Alert} from "react-bootstrap"
import {Link} from 'react-router-dom'
import "./Brand.css";
import axios from "axios";
import SweetAlert from "sweetalert-react";
import 'sweetalert/dist/sweetalert.css';

axios.defaults.baseURL='http://localhost:8000'


function BrandListing(props) {
    const [deleteId, setDeleteId] = useState("");
    const [brands, setBrands] = useState([]);
    const [showAlert, setShowAlert] = useState(false)
    const [showCancelButton, setShowCancelButton] = useState(false)
    const [showAlertTitle, setShowAlertTitle] = useState("")
    const [showAlertText, setShowAlertText] = useState("")
    useEffect(() => {
        GetBrands()
    }, [])

    const GetBrands=()=>{
        axios.get('/get-brands',{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.usertoken}`
            }
        })
            .then(function (response) {
                setBrands(response.data);
                // console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const showConfirmModal= (id)=> {
        setDeleteId(id);
        setShowAlert(true);
        setShowCancelButton(true);
        setShowAlertTitle("Alert");
        setShowAlertText("Are you sure?");
    }
    const hideConfirmModal= ()=> {
        setDeleteId('');
        setShowAlert(false);
        setShowCancelButton(false);
    }
    const onClickConfirm= ()=> {
        if(deleteId){
            DeleteBrand();
        }else{
            setShowAlert(false);
        }
    }
    const DeleteBrand= ()=> {
                axios.delete(`/delete/brand/${deleteId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.usertoken}`
                    }
                })
                    .then(function (response) {
                        console.log(response.data)
                        GetBrands();
                        hideConfirmModal();

                    })
                    .catch((error) => {
                        if (error.response?.status === 401) {
                            props.logout();
                        }
                        if (error.response?.status === 404) {
                            setDeleteId('');
                            setShowAlert(true);
                            setShowCancelButton(false);
                            setShowAlertTitle("Error");
                            setShowAlertText("Product with this brand exists.");
                        }
                    })
    }



    return (
        <>
            <Container>
                <Breadcrumb className="mt-3">
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Brand</Breadcrumb.Item>
                </Breadcrumb>
                <Col><Link className="btn btn-primary brandAddButton mb-2" to="/brands/create">Add Brands</Link></Col>


                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Brand_Name</th>
                            <th>Brand_Status</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>

                     { brands.map((row, index) => {
                            return(
                                <tr>
                                <td>{index + 1}</td>
                                <td>{row.brandName}</td>
                                <td>{row.brandStatus}</td>
                                <td>
                                    <Link className="btn Edit mb-2" to={`/brands/edit/${row._id}`} > Edit </Link>
                                    <a className="btn Edit mb-2" onClick={()=>showConfirmModal(row._id) } > Delete </a>
                                </td>
                            </tr>
                            );
                     })}

                    </tbody>
                </Table>
                <SweetAlert
                    show={showAlert}
                    title={showAlertTitle}
                    text={showAlertText}
                    showCancelButton={showCancelButton}
                    onConfirm={() => onClickConfirm()}
                    onCancel={() => hideConfirmModal()}
                />
            </Container>
        </>
    )
    }

export default BrandListing
