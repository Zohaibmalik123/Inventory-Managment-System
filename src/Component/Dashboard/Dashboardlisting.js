// import Button from '@restart/ui/esm/Button'
import React from 'react'
import { Container , Row ,Col } from "react-bootstrap"

function DashBoard() {
    return (
        <>
                <Container>
                    <Row>
                        <Col className="Board">
                        DATE
                        </Col>
                        </Row>

                    <Row>
                        <Col className="Board">Total Orders</Col>
                        <Col className="Board">Total products</Col>
                    </Row>
                </Container>
        </>
    )
}

export default DashBoard
