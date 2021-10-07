import React, {useEffect, useState} from 'react'
// import { Form } from 'react-bootstrap'
import { Container, Col ,Table , Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from "axios";
function Orderslist() {

    const [orders, setOrders] = useState([]);
    useEffect(() => {
        axios.get('/get-orders',{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.usertoken}`
            }
        })
            .then(function (response) {
                setOrders(response.data);
                // console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])


    return (
        <>
            <Container>
            <Breadcrumb className="mt-3 breadcrumb">
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Orders</Breadcrumb.Item>
                </Breadcrumb>
                <Col><Link className="btn btn-primary brandAddButton mb-2" to="/createorders">Add Orders</Link></Col>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Order Date</th>
                            <th>Customer Name</th>
                            <th>Product_Name</th>
                            <th>Rate</th>
                            <th>Quantity</th>
                            <th>Discount</th>
                            <th>Total Amount</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                                orders.map((row , index)=>{
                                    return(
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{row.orderDate}</td>
                                            <td>{row.customerName}</td>
                                            <td>{row.productName}</td>
                                            <td>{row.rate}</td>
                                            <td>{row.quantity}</td>
                                            <td>{row.discount}</td>
                                            <td>{row.totalAmount}</td>
                                            <td>
                                                <Link className="btn Edit mb-2" to={`/orders/edit/${row._id}`} > Edit </Link>
                                            </td>

                                </tr>
                                    )
                                })
                            }

                    </tbody>
                </Table>
            </Container>

        </>
    )
}

export default Orderslist
