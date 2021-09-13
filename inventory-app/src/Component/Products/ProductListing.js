import React from 'react'
import { Table, Container, Breadcrumb, Col } from "react-bootstrap"
import {Link} from 'react-router-dom'
function ProductListing() {
    return (
        <>

            <Container>
                <Breadcrumb className="mt-3">
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Products</Breadcrumb.Item>
                </Breadcrumb>
                <Col><Link className="btn btn-primary brandAddButton mb-2" to="/createproducts">Add Products</Link></Col>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th>Brand Name</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@ds</td>
                            <td>kainat</td>
                            <td>available</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default ProductListing
