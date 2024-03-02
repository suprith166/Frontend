import React, { useState, useEffect } from 'react';
import { Container, Card, Table } from 'react-bootstrap';
import axios from 'axios';
import {AiFillDelete} from 'react-icons/ai'
import { toast } from 'react-toastify';
import { baseUrl } from '../../App';

const ViewEmployee = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios.get(baseUrl + '/Emp/GetAllEmployees')
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteEmp = (id) =>{
    axios.delete(baseUrl +`/Emp/DeleteEmp/${id}`)
    .then((res) => {
      toast.success(res.data)
      fetchEmployees();
    })
    .catch((error) => {
      console.error(error);
    });
  }

  return (
    <Container>
      <Card className="shadow  mt-5 mx-auto">
        <Card.Body>
          <Card.Title className="text-center my-4">Employee List</Card.Title>
          <Table striped bordered hover responsive className='text-center'>
            <thead >
              <tr >
                <th>Employee ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Password</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((data) => (
                <tr key={data.empid}>
                  <td>{data.empid}</td>
                  <td>{data.empname}</td>
                  <td>{data.age}</td>
                  <td>{data.mobile}</td>
                  <td>{data.email}</td>
                  <td>{data.password}</td>
                  <td><AiFillDelete className='fs-4 text-danger' onClick={()=>deleteEmp(data.empid)}/></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewEmployee;
