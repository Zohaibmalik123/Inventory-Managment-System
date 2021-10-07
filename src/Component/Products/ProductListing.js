import React, {useEffect, useState} from 'react'
import {Table, Container, Breadcrumb, Col} from "react-bootstrap"
import {Link} from 'react-router-dom'
import axios from "axios";
import SweetAlert from "sweetalert-react";

function ProductListing(props) {
    const [showCancelButton , setShowCancelButton]=useState(false)
    const [deleteId , setDeleteId] = useState("")
    const [product, setProducts] = useState([]);
    const [showAlert , setShowAlert] = useState("")
    const [showAlertTitle, setShowAlertTitle] = useState("")
    const [showAlertText, setShowAlertText] = useState("")

    useEffect(() => {
      GetProducts()
    }, [])

    const GetProducts=()=>{
        axios.get('/get-products',{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.usertoken}`
            }
        })
            .then(function (response) {
                setProducts(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    const ShowConfirmModal= (id)=> {
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
            DeleteProduct();
        }else{
            setShowAlert(false);
        }
    }

    const DeleteProduct= ()=>{
        axios.delete(`/delete/product/${deleteId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.usertoken}`
            }
        })
            .then(function (response) {
                console.log(response.data)
                GetProducts();
                hideConfirmModal()
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
                        setShowAlertText("Order with this product exists.");
                    }
            })

    }

    return (
        <>
            <Container>
                <Breadcrumb className="mt-3">
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Products</Breadcrumb.Item>
                </Breadcrumb>
                <Col><Link className="btn btn-primary brandAddButton mb-2" to="/createproducts">Add Products</Link></Col>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product_Name</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th>Brand_Name</th>
                            <th>Category_Name</th>
                            <th>Status</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>

                    { product.map((row, index) => {
                        return(
                            <tr>
                                <td>{index + 1}</td>
                                <td>{row.productName}</td>
                                <td>{row.quantity}</td>
                               <td>{row.rate}</td>
                                <td>{row.brand?.brandName}</td>
                                {/*<td></td>*/}
                                <td>{row.category?.categoryName}</td>
                                <td>{row.productStatus}</td>
                                <td>
                                    <Link className="btn Edit mb-2" to={`/product/edit/${row._id}`}>Edit</Link>
                                    <a className="btn Edit mb-2" onClick={()=>ShowConfirmModal(row._id)}>Delete</a>
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

export default ProductListing









