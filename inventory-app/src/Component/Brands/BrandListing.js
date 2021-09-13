// import Button from '@restart/ui/esm/Button'
import React from 'react'
import { Table, Container, Breadcrumb, Col } from "react-bootstrap"
import { Link } from 'react-router-dom'
import "./Brand.css";

function BrandListing() {

    

    return (
        <>
            <Container>
            <Breadcrumb className="mt-3">
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Brand</Breadcrumb.Item>
            </Breadcrumb>
            <Col><Link className="btn btn-primary brandAddButton mb-2" to="/brands/create">Add Brands</Link></Col>
                
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Brand Name</th>
                            <th>Brand Status</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@ds</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default BrandListing
