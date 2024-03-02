import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { baseUrl } from "../../App";

export default function ApproveReject() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = () => {
    axios
      .get(baseUrl + "/Leave/GetLeaves")
      .then((res) => {
        setLeaves(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateStatus = (id, status) => {
    axios
      .put(baseUrl + `/Leave/UpdateLeave/${id}`, { status: status })
      .then((res) => {
        toast.success(res.data);
        fetchLeaves();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="m-4">
      <Card.Body>
        <Card.Title className="text-center my-5 fs-3">Leave List</Card.Title>
        <Table striped bordered hover responsive className="text-center">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Leave Type</th>
              <th>Reason</th>
              <th>Days</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.leaveId}>
                <td>{leave.employee.empid}</td>
                <td>{leave.employee.empname}</td>
                <td>{leave.leavetype}</td>
                <td>{leave.reason}</td>
                <td>{leave.days}</td>
                <td>{leave.startdate}</td>
                <td>{leave.enddate}</td>
                <td>{leave.status}</td>
                {leave.status === "Pending" && (
                  <>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => updateStatus(leave.leaveid, "Approved")}
                      >
                        Approve
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => updateStatus(leave.leaveid, "Rejected")}
                      >
                        Reject
                      </Button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </div>
  );
}
