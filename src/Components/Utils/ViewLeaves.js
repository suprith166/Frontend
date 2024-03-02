import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { baseUrl } from '../../App';


const ViewLeaves = () => {

  const [leavesData, setLeavesdata] = useState([])

  const {pathname} =useLocation()


useEffect(()=>{
  GetLeaves()
},[])

function GetLeaves(){
  const user = JSON.parse(sessionStorage.getItem("user"))
  const api = pathname === "/empdashboard/viewleaves" ?  axios.get(baseUrl + `/Leave/GetLeavesByEmp/${user.empid}`) :  axios.get(baseUrl + '/Leave/GetLeaves')
  api.then((res)=>{
    setLeavesdata(res.data)
    console.log(res.data);
  })
  .catch((error)=>{
    console.log('Error fetching data', error);
  })
}

  return (
    <Container>
      <h3 className='text-center my-5'>List of Leaves</h3>
      <Row>
        {leavesData.map((leave) => (
          <Col key={leave.leaveId}  lg={6} className="mb-4">
            <Card className="shadow">
              <Card.Body>
                <Card.Title className='text-danger'>Leave ID: {leave.leaveId}</Card.Title>
                <Card.Text style={{ lineHeight: '2' }}>
                  <strong>Employee ID:</strong> {leave.employee.empid}<br />
                  <strong>Employee Name:</strong> {leave.employee.empname}<br />
                  <strong>Type:</strong> {leave.leavetype}<br />
                  <strong>Reason:</strong> {leave.reason}<br />
                  <strong>No. of days:</strong> {leave.days}<br />
                  <strong>Start Date:</strong> {leave.startdate}<br />
                  <strong>End Date:</strong> {leave.enddate}<br />
                  <strong>Status:</strong> {leave.status }
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ViewLeaves;
