import React from 'react'
import {Form , Col , Row , Button , Container , Breadcrumb} from 'react-bootstrap'

function ProductsCreateEdit() {
    return (
        <>
             <Container>
                <Breadcrumb className="mt-3">
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="#">Products</Breadcrumb.Item>
                    <Breadcrumb.Item active>Create Products</Breadcrumb.Item>
                </Breadcrumb>

                <Row className="justify-content-md-center">
                    <Col md="6">
                        <Form>

                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label> Name</Form.Label>
                                <Form.Control placeholder="1234 Main St" />
                                <Form.Label> Quantity</Form.Label>
                                <Form.Control placeholder="1234 Main St" />
                                <Form.Label> Rate</Form.Label>
                                <Form.Control placeholder="1234 Main St" />
                                <Form.Label> Brand Name</Form.Label>
                                <Form.Control placeholder="1234 Main St" />
                            </Form.Group>
                            


                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Status</Form.Label>
                                <Form.Select defaultValue="Choose...">
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </Form.Select>
                            </Form.Group>

                            <Row className="justify-content-md-center">
                                <Col>
                                    <Button variant="primary" type="submit" className="btn btn-primary mt-3 m-auto w-100">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ProductsCreateEdit
