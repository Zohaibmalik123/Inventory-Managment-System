import React from 'react'
import { Table, Form ,Container, Breadcrumb, Col } from "react-bootstrap"
import { Link  } from 'react-router-dom'
 import "./category.css"; 

function CategoryListing() {
    return (
        <>

            <Container>
                <Breadcrumb className="mt-3">
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Category</Breadcrumb.Item>
                </Breadcrumb>
                <Col><Link className="btn btn-primary categories mb-2" to="/category/add">Add Category</Link></Col>

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
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>
                            <Form.Select defaultValue="Action" aria-label="Default select example">
                                    <option value="1">Edit</option>
                                    <option value="2">Remove</option>
                                </Form.Select>

                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </>
    )

}

export default CategoryListing
