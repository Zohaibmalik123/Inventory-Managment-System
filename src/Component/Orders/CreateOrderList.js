import React, {useEffect, useState} from 'react'
import { Form, Col, Row, Button, Container, Breadcrumb } from 'react-bootstrap'
import "./order.css"
import axios from "axios";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
axios.defaults.baseURL='http://localhost:8000'

function CreateOrderList(props) {


    const [customerName , setCustomerName] = useState("")
    const [customerPhoneNo , setCustomerPhoneNo] = useState("")
    const [orderDate , setOrderDate] = useState("")
    const [productId , setProductId] = useState("")
    const [rate , setRate] = useState("")
    const [total , setTotal] = useState("")
    const [quantity , setQuantity] = useState("")
    const [totalAmount , setTotalAmount] = useState("")
    const [discount , setDiscount] = useState("")
    const [paymont , setPaymont] = useState("")
    const [showAlert , setShowAlert] = useState(false)
    const [showAlertTitle , setShowAlertTitle] = useState("")
    const [showAlertText , setShowAlertText] = useState("")
    const [product, setProducts] = useState([]);
    useEffect(() => {
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
    }, [])

    const createOrder = (e) =>{
        e.preventDefault();
        let item = { customerName , customerPhoneNo, productId , orderDate , quantity , rate , totalAmount , discount , paymont , total};
        axios.post('/create/order', item,
            { headers : {"Content-Type" : "application/json",
                    Authorization : `Bearer ${localStorage.usertoken}`
                }})
            .then(function (response) {
                setShowAlertText("Product is successfully created")
                setShowAlertTitle("Success")
                setShowAlert(true)
                setCustomerName("")
                setProductId("")
                setCustomerPhoneNo("")
                setOrderDate("")
                setQuantity("")
                setRate("")
                setTotalAmount("")
                setDiscount("")
                setPaymont("")

            })
            .catch( (error) => {
                if(error.response?.status === 401){
                    props.logout();
                }else {
                    setShowAlertText("Failed to Order.")
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
                <Breadcrumb className="mt-3 breadcrumb">
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/orders">Orders</Breadcrumb.Item>
                    <Breadcrumb.Item active>Create Order</Breadcrumb.Item>
                </Breadcrumb>

                <Row className="justify-content-md-center">

                    <Form className="body" method="POST" onSubmit={createOrder}>
                        <Form.Group as={Row} className="mb-3 mt-4" controlId="formGridAddress1">
                            <Form.Label column sm="2"> Customer Name : </Form.Label>
                            <Col sm="10">
                                <Form.Control column sm="10" type="name"  value={customerName} onChange={(e)=>setCustomerName(e.target.value)} placeholder="" />
                            </Col>
                            <Form.Label className="mt-4" column sm="2"> Contact Number : </Form.Label>
                            <Col sm="10">
                                <Form.Control type="Number" className="mt-4"  value={customerPhoneNo} onChange={(e)=>setCustomerPhoneNo(e.target.value)} placeholder="" />
                            </Col>
                            <Form.Label className="mt-4" column sm="2">Order Date : </Form.Label>
                            <Col sm="10">
                                <Form.Control className="mt-4" type="date"  value={orderDate} onChange={(e)=>setOrderDate(e.target.value)} placeholder="" />
                            </Col>
                            <Form.Label className="mt-4" column sm="1">Product:</Form.Label>
                            <Col sm="2">
                                <Form.Select className="mt-4" type="text" value={productId} onChange={(e) => setProductId(e.target.value)}
                                             defaultValue="Choose...">
                                    <option value="">Select Products</option>
                                    {product.map((row) => {
                                        return (
                                            <option value={row._id}>{row.productName}</option>
                                        );
                                    })}
                                </Form.Select>
                                {/*<Form.Control className="mt-4" type="text"  value={productName} onChange={(e)=>setProductName(e.target.value)} placeholder="" />*/}
                            </Col>
                            <Form.Label className="mt-4" column sm="1">Rate :</Form.Label>
                            <Col sm="2">

                                {/*<Form.Select className="mt-4" type="text" value={rate} onChange={(e) => setRate(e.target.value)}*/}
                                {/*             defaultValue="Choose...">*/}
                                {/*    <option value="">Rates</option>*/}
                                {/*    {product.map((row) => {*/}
                                {/*        return (*/}
                                {/*            <option>{row.rate}</option>*/}
                                {/*        );*/}
                                {/*    })}*/}
                                {/*</Form.Select>*/}
                                <Form.Control className="mt-4" type="number"   value={rate} onChange={(e)=>setRate(e.target.value)}placeholder="" />

                            </Col>
                            <Form.Label className="mt-4" column sm="1">Quantity :</Form.Label>
                            <Col sm="2">
                                <Form.Control className="mt-4" type="number"  value={quantity} onChange={(e)=>setQuantity(e.target.value)} placeholder="" />
                            </Col>
                            <Form.Label className="mt-4" column sm="1">Total :</Form.Label>
                            <Col sm="2">
                                <Form.Control className="mt-4" type="number"  value={total} onChange={(e)=>setTotal(e.target.value)} placeholder="" />
                            </Col>
                            <Form.Label className="mt-4" column sm="2">Total Amount :</Form.Label>
                            <Col sm="4">
                                <Form.Control className="mt-4" type="number" value={totalAmount} onChange={(e)=>setTotalAmount(e.target.value)} placeholder="" />
                            </Col>
                            <Form.Label className="mt-4" column sm="2">Discount :</Form.Label>
                            <Col sm="4">
                                <Form.Control className="mt-4" type="percentage" value={discount} onChange={(e)=>setDiscount(e.target.value)} placeholder="" />
                            </Col>
                            <Form.Label className="mt-4" column sm="2">Paymont :</Form.Label>
                            <Col sm="4">
                                {/* <Form.Control className="mt-4" type="percentage" placeholder="" /> */}
                                <Form.Select className="mt-4" value={paymont} onChange={(e)=>setPaymont(e.target.value)} defaultValue="Choose...">
                                    <option>Method</option>
                                    <option>cheque</option>
                                    <option>cash</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Row className="justify-content-md-center">
                            <Col md="6">
                                <Button variant="primary" type="submit" className="btn btn-dark mt-3 m-auto w-100 mb-3">
                                    Submit
                                </Button>
                            </Col>
                        </Row>

                    </Form>
                </Row>
            </Container>
        </>
    )
}

export default CreateOrderList
