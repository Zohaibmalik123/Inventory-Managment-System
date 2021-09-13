import React from 'react'
import { Table, Container, Breadcrumb, Col } from "react-bootstrap"
import { Link } from 'react-router-dom'
 import "./category.css"; 

function CategoryListing() {
    return (
        <>

            <Container>
                <Breadcrumb className="mt-3">
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Category</Breadcrumb.Item>
                </Breadcrumb>
                <Col><Link className="btn btn-primary categories mb-2" to="/createlist">Add Category</Link></Col>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Category Name</th>
                            <th>Category Status</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </>
    )

}

export default CategoryListing
