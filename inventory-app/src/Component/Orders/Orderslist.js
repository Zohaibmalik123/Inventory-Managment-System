import React from 'react'
// import { Form } from 'react-bootstrap'
import { Container, Col ,Table , Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom'
function Orderslist() {
    return (
        <>
            <Container>
            <Breadcrumb className="mt-3 breadcrumb">
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Orders</Breadcrumb.Item>
                </Breadcrumb>
                <Col><Link className="btn btn-primary brandAddButton mb-2" to="/createorders">Add Orders</Link></Col>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Order Date</th>
                            <th>Customer Name</th>
                            <th>Product</th>
                            <th>Rate</th>
                            <th>Quantity</th>
                            <th>Discount</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            
                        </tr>
                    </tbody>
                </Table>
            </Container>

        </>
    )
}

export default Orderslist
