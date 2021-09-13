import React from 'react'
// import { Form } from 'react-bootstrap'
import {Container  , Col } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import CreateOrderList from "./CreateOrderList"
function Orderslist() {
    return (
        <>
            <Container>
                <Col><Link className="btn btn-primary brandAddButton mb-2" to="/createorders">Add Orders</Link></Col>
                < CreateOrderList/>
            </Container>
            
        </>
    )
}

export default Orderslist
