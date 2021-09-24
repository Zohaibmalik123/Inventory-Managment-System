import React, {useEffect, useState} from 'react'
import { Table,Container, Breadcrumb, Col, Button} from "react-bootstrap"
import {Link} from 'react-router-dom'
import "./Brand.css";
import axios from "axios";
axios.defaults.baseURL='http://localhost:8000'


function BrandListing(props) {
    const [brands, setBrands] = useState([]);
    useEffect(() => {
        axios.get('/get-brands')
        .then(function (response) {
            setBrands(response.data);
            // console.log(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
    }, [])


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
                            <th>Id</th>
                            <th>Brand_Name</th>
                            <th>Brand_Status</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>

                     { brands.map((row, index) => {
                            return(
                                <tr>
                                <td>{index + 1}</td>
                                <td>{row.brandName}</td>
                                <td>{row.brandStatus}</td>
                                <td>
                                    <Link className="btn Edit mb-2" to={`/brands/edit/${row._id}`} > Edit </Link>
                                </td>
                            </tr>
                            );
                     })}

                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default BrandListing
