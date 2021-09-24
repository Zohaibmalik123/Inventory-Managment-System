import React, {useEffect, useState} from 'react'
import { Table ,Container, Breadcrumb, Col } from "react-bootstrap"
import { Link  } from 'react-router-dom'
 import "./category.css";
import axios from "axios";

function CategoryListing() {

    const [category, setCategory] = useState([]);
    useEffect(() => {
        axios.get('/get-category')
            .then(function (response) {
                setCategory(response.data);
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


                    { category.map((row, index) => {
                        return(
                            <tr>
                                <td>{index + 1}</td>
                                <td>{row.categoryName}</td>
                                <td>{row.categoryStatus}</td>
                                <td>
                                    <Link className="btn Edit mb-2" to={`/category/edit/${row._id}`}>Edit</Link>
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

export default CategoryListing
