import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../App";

const AddEmployee = () => {
  const [input, setInput] = useState({
    empid: "",
    empname: "",
    age: "",
    mobile: "",
    email: "",
    password: "",
    salary: "",
    no_of_leaves:''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({...input,[name]: value});
  };

  function clearAll() {
    setInput({
      empid: "",
      empname: "",
      age: "",
      mobile: "",
      email: "",
      password: "",
      salary: "",
      no_of_leaves:''
    });
  }

  const handleAddEmp = (e) => {
    e.preventDefault();
    axios
      .post(baseUrl + `/Emp/AddEmp`, input)
      .then((res) => {
        toast.success(res.data);
        clearAll();
      })
      .catch((error) => {
        toast.error(error.response ? error.response.data : "Failed to add");
        console.log(error.response.data);
      });
  };

  return (
    <Container>
      <Card className="shadow w-50 mt-5 mx-auto">
        <Card.Body>
          <Card.Title className="text-center my-4">Add Employee</Card.Title>
          <Form onSubmit={handleAddEmp}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="empid"
                value={input.empid}
                onChange={handleInputChange}
                placeholder="Employee ID"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="empname"
                value={input.empname}
                onChange={handleInputChange}
                placeholder="Employee Name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                name="age"
                value={input.age}
                onChange={handleInputChange}
                placeholder="Age"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                name="email"
                value={input.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                name="mobile"
                value={input.mobile}
                onChange={handleInputChange}
                placeholder="Phone Number"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                name="salary"
                value={input.salary}
                onChange={handleInputChange}
                placeholder="Basic Salary"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                name="no_of_leaves"
                value={input.no_of_leaves}
                onChange={handleInputChange}
                placeholder="Total no. of annual leaves"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                name="password"
                value={input.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" >
              Add
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddEmployee;
