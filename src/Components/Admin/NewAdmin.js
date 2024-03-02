import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { baseUrl } from "../../App";
import {RiDeleteBin5Line} from "react-icons/ri"

export default function NewAdmin() {
  const [adminid, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [adminlist, setAdminList] = useState([]);

  const admin = JSON.parse(sessionStorage.getItem("user"));

  useEffect(()=>{
    getAdmins()
  },[])

  function handleSubmit(e) {
    e.preventDefault()
    const data = {
      adminid:adminid,
      password:password
    }

    axios.post(baseUrl+`/Admin/AddAdmin`,data)
    .then(res=>{
      toast.success(res.data)
      getAdmins()
      setAdminId("")
      setPassword("")
    })
    .catch(err=>{
      toast.error(err.response? err.response.data : "Something went wrong")
    })
  }

  function getAdmins()
  {
    axios.get(baseUrl + `/Admin/GetAdmins`)
    .then(res=>{
      setAdminList(res.data.filter(obj=>obj.adminid!==admin?.adminid))
    })
    .catch(err=>{
      console.log("Error", err)
    })
  }

  function DeleteAdmin(adminid)
  {
    axios.delete(baseUrl + `/Admin/DeleteAdmin/${adminid}`)
    .then(res=>{
      toast.warning(res.data)
      getAdmins()
    })
    .catch(err=>{
      toast.error(err.response? err.response.data : "Something went wrong")
    })
  }

  return (
    <Container fluid>
      <Row>
      <Col md={6}>
        <Card className="mt-5">
          <Card.Header className="text-center">
            <h3>Add Admin</h3>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <label htmlFor="name">Admin Id</label>
                <Form.Control
                  type="text"
                  value={adminid}
                  onChange={(e) => setAdminId(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <label htmlFor="name">Password</label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Button type="submit" className="float-end">
                  Add admin
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card className="mt-5">
          <Card.Header className="text-center">
            <h3>Existing Admins</h3></Card.Header>
          <Card.Body>
            <Table className="text-center">
              <thead>
                <tr>
                  <th scope="col">Admin Id</th>
                  <th scope="col">Password</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {adminlist?.map((admin, index)=>{
                  return(
                    <tr key={index}>
                      <td>{admin.adminid}</td>
                      <td>{admin.password}</td>
                      <td className="text-success">< RiDeleteBin5Line color="red" size={25} onClick={()=>DeleteAdmin(admin.adminid)}/></td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
      </Row>
    </Container>
  );
}
