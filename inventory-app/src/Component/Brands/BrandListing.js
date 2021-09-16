// import Button from '@restart/ui/esm/Button'
import React from 'react'
import { Table, Container, Breadcrumb, Col , Form } from "react-bootstrap"
import { Link } from 'react-router-dom'
// import TableRow from '@material-ui/core/TableRow';
import "./Brand.css";

// var tableRowIndex = 0;
function BrandListing() {
 
// const [tableBrand , setTableBrand] = useState([{
//     Id :'0',
//     Brand_Name:"",
//     Brand_Status:""
// }]);

// const handleChange = data  => {
//     tableBrand[data.Id] = data
// }

// const addNewBrand= () =>{
//     tableRowIndex = parseFloat(tableRowIndex) +1
//     var updatedBrand = [...tableBrand]
//     updatedBrand[tableRowIndex] = {Id: tableRowIndex , Brand_Name : "" , Brand_Status :""}
//     setTableBrand(updatedBrand)
// }


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

                    {/* {
                  tableBrand.forEach((row, index) => {
                     if(row)
                     return(
                        <TableRow key={index} row={row} handleDataChange={handleChange} ></TableRow>
                     )
                  })
               } */}



                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td> <Form.Select defaultValue="Action" aria-label="Default select example">
                                    <option value="1">Active</option>
                                    <option value="2">InActive</option>
                                </Form.Select></td>
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

export default BrandListing
