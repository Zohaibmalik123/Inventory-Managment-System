import React, {useEffect, useState} from 'react'
import { Table ,Container, Breadcrumb, Col } from "react-bootstrap"
import {Link, useParams} from 'react-router-dom'
 import "./category.css";
import axios from "axios";
import SweetAlert from "sweetalert-react";

function CategoryListing(props) {
    const [deleteId, setDeleteId] = useState("");
    const [category, setCategory] = useState([]);
    const [currentCategory, setCurrentCategory] = useState("");
    const [showAlert, setShowAlert] = useState(false)
    const [showCancelButton, setShowCancelButton] = useState(false)
    const [showAlertTitle, setShowAlertTitle] = useState("")
    const [showAlertText, setShowAlertText] = useState("")


    let {id}=useParams()
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
                    if (!category.categoryName) {
                        console.log("Response", response.data)

                        console.log("Name:", response.data.categoryName)
                        setCurrentCategory({
                            categoryName: response.data.categoryName,
                        })
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
             getCategoriesWithParentId(id)
    },[id])

    const getCategoriesWithParentId =(id)=>{
        let url = `/get-categories`;
        if(id){
            url = `/get-categories/${id}`
        }
        axios.get(url,{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.usertoken}`
            }
        })
            .then(function (response) {
                    console.log("response", response)
                    setCategory(response.data);
                    console.log("jhdsyfdsbdv")
                if (!id) {
                    console.log("Response", response.data)
                    console.log("jdghfsdvsbdsf")

                    console.log("Name:", category.categoryName)
                    setCurrentCategory({
                        currentCategory: response.data.categoryName,
                    });
                }})
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
            DeleteCategory();
        }else{
            setShowAlert(false);
        }
    }

    const DeleteCategory=()=>{
        axios.delete(`/delete/category/${deleteId}`, {
                method:"DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.usertoken}`
                }
            })
                .then(function (response) {
                    getCategoriesWithParentId();
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
                    <Breadcrumb.Item>categories</Breadcrumb.Item>
                    <Breadcrumb.Item>{currentCategory.categoryName}</Breadcrumb.Item>
                </Breadcrumb>
                <Col><Link className="btn btn-primary categories mb-2" to="/categories/add">Add Category</Link></Col>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Category Name</th>
                            <th>Category Status</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>


                    { category.map((row, index) => {
                        return(
                            <tr>
                                <td>{index + 1}</td>
                                <td>
                                  <Link className="btn Edit mb-2" to={`/category/${row._id}`}>{row.categoryName}</Link>
                                </td>
                                <td>{row.categoryStatus}</td>
                                <td>
                                    <Link className="btn Edit mb-2" to={`/category/edit/${row._id}`}>Edit</Link>
                                    <a className="btn Edit mb-2" onClick={()=>showConfirmModal(row._id)} > delete </a>
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

export default CategoryListing
