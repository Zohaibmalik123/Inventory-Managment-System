import React from 'react'
import { Form, Col, Row, Button, Container, Breadcrumb } from 'react-bootstrap'
import "./order.css"

function CreateOrderList() {
    return (
        <>
            <Container>
                <Breadcrumb className="mt-3 breadcrumb">
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Orders</Breadcrumb.Item>
                </Breadcrumb>

                <Row className="justify-content-md-center">

                    <Form className="body">
                        <Form.Group as={Row} className="mb-3 mt-4" controlId="formGridAddress1">
                            <Form.Label column sm="2"> Customer Name : </Form.Label>
                            <Col sm="10">
                                <Form.Control column sm="10" type="name" placeholder="" />
                            </Col>
                            <Form.Label className="mt-4" column sm="2"> Contact Number : </Form.Label>
                            <Col sm="10">
                                <Form.Control type="Number" className="mt-4" placeholder="" />
                            </Col>
                            <Form.Label className="mt-4" column sm="2">Order Date : </Form.Label>
                            <Col sm="10">
                                <Form.Control className="mt-4" type="date" placeholder="" />
                            </Col>
                            <Form.Label className="mt-4" column sm="1">Product :</Form.Label>
                            <Col sm="2">
                                <Form.Control className="mt-4" type="text" placeholder="" />
                            </Col>
                            <Form.Label className="mt-4" column sm="1">Rate :</Form.Label>
                            <Col sm="2">
                                <Form.Control className="mt-4" type="number" placeholder="" />
                            </Col>
                            <Form.Label className="mt-4" column sm="1">Quantity :</Form.Label>
                            <Col sm="2">
                                <Form.Control className="mt-4" type="number" placeholder="" />
                            </Col>
                            <Form.Label className="mt-4" column sm="1">Total :</Form.Label>
                            <Col sm="2">
                                <Form.Control className="mt-4" type="number" placeholder="" />
                            </Col>
                            <Form.Label className="mt-4" column sm="2">Total Amount :</Form.Label>
                            <Col sm="4">
                                <Form.Control className="mt-4" type="number" placeholder="" />
                            </Col>
                            <Form.Label className="mt-4" column sm="2">Discount :</Form.Label>
                            <Col sm="4">
                                <Form.Control className="mt-4" type="percentage" placeholder="" />
                            </Col>
                            <Form.Label className="mt-4" column sm="2">Paymont :</Form.Label>
                            <Col sm="4">
                                {/* <Form.Control className="mt-4" type="percentage" placeholder="" /> */}
                                <Form.Select className="mt-4" defaultValue="Choose...">
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
