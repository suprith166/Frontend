import axios from "axios";
import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { baseUrl } from "../../App";

const LeaveRequest = () => {
  const emp = JSON.parse(sessionStorage.getItem("user"));

  const Type = ["Annual", "Sick", "Personal"];

  const [input, setInput] = useState({
    leavetype: "",
    reason: "",
    startdate: "",
    enddate: "",
    days: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setInput({
      ...input,
      [name]: value,
    });

    if (name === "startdate" || name === "enddate") {
      debugger;

      const startDate = new Date(name === "startdate" ? value : input.startdate);

      const endDate = new Date(name === "enddate" ? value : input.enddate);

      if (startDate && endDate) {
        if (endDate.getTime() < startDate.getTime()) {
          alert("End date should be greater than the start date.");
          setInput({ ...input, enddate: "" });
        }
      }
    }
  };

  const handleLeaveRequest = async (event) => {
    event.preventDefault();
    const daysDifference = await calculateDaysDifference();
    try {
      axios
        .post(baseUrl + `/Leave/RequestLeave/${emp?.empid}`, {
          ...input,
          days: daysDifference,
        })
        .then((res) => {
          toast.success("Leave requested successfully");
          setInput({
            leavetype: "",
            reason: "",
            startdate: "",
            enddate: "",
            days: "",
          });
        })
        .catch((error) => {
          toast.error("Failed to request leave");
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const calculateDaysDifference = () => {
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
    const startDateMilliseconds = new Date(input.startdate).getTime();
    const endDateMilliseconds = new Date(input.enddate).getTime();
    debugger;
    const differenceInDays = Math.round(
      Math.abs((startDateMilliseconds - endDateMilliseconds) / oneDay)
    );
    return differenceInDays + 1;
  };

  return (
    <Container>
      <Card className="shadow w-50 mt-5 mx-auto">
        <Card.Body>
          <Card.Title className="text-center my-4">Request Leave</Card.Title>
          <Form onSubmit={handleLeaveRequest}>
            <Form.Group className="mb-3">
              <Form.Control
                className="text-center"
                as="select"
                name="leavetype"
                value={input.leavetype}
                onChange={handleInputChange}
                required
              >
                <option value="" hidden>
                  Select a leave type
                </option>
                {Type.map((leaveType) => (
                  <option key={leaveType} value={leaveType}>
                    {leaveType}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Leave Reason</Form.Label>
              <Form.Control
                type="text"
                name="reason"
                value={input.reason}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startdate"
                value={input.startdate}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="enddate"
                value={input.enddate}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="float-end">
              Request
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LeaveRequest;
