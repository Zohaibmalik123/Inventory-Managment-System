import React, {useEffect, useState} from 'react'
import {Table, Container, Breadcrumb, Col} from "react-bootstrap"
import {Link} from 'react-router-dom'
import axios from "axios";
function ProductListing() {

    const [product, setProducts] = useState([]);
    useEffect(() => {
        axios.get('/get-products')
            .then(function (response) {
                setProducts(response.data);
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
                    <Breadcrumb.Item active>Products</Breadcrumb.Item>
                </Breadcrumb>
                <Col><Link className="btn btn-primary brandAddButton mb-2" to="/createproducts">Add Products</Link></Col>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product_Name</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th>Brand_Name</th>
                            <th>Category_Name</th>
                            <th>Status</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>

                    { product.map((row, index) => {
                        return(
                            <tr>
                                <td>{index + 1}</td>
                                <td>{row.productName}</td>
                                <td>{row.quantity}</td>
                                <td>{row.rate}</td>
                                <td>{row.brand?.brandName}</td>
                                {/*<td></td>*/}
                                <td>{row.category.categoryName}</td>
                                <td>{row.productStatus}</td>
                                <td>
                                    <Link to={`/product/edit/${row._id}`}>
                                        Edit
                                    </Link>
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

export default ProductListing
