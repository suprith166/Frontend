import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { baseUrl } from "../../App";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../Css/SalaryGenerate.css";
import { PdfGenerator } from "../Context/PdfContext";

export default function SalaryGenerate() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [emp, setEmp] = useState(null);
  const [salaryMonth, setSalaryMonth] = useState(null);
  const [basicsalary, setBasicSalary] = useState(0);
  const [hrAllowance, setHrAllowance] = useState(0);
  const [daAllowance, setDaAllowance] = useState(0);
  const [leaveAmount, setLeaveAmount] = useState(0);
  const [totalSalary, setTotalSalary] = useState(0);
  const [totalleaves, setTotalLeaves] = useState(0);

  const context = PdfGenerator();

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const salaryYear = salaryMonth?.getFullYear();
      const salaryMonthNumber = salaryMonth?.getMonth() + 1;

      console.log(salaryMonthNumber)
      var leaves = 0;

      try {
        const response = await axios.get(
          baseUrl +
            `/Leave/GetLeaveByEmpAndMonth/${salaryMonthNumber}/${salaryYear}/${selectedEmployee?.value}`
        );

        leaves = response.data;
        console.error("Total leaves are " + response.data);

        const year = new Date().getFullYear();

        const lastDayOfMonth = new Date(year, salaryMonthNumber, 0);
        const numberOfDaysInMonth = lastDayOfMonth.getDate();
        console.log(numberOfDaysInMonth);

        if (basicsalary > 0 && leaves > 0) {
          if (emp.no_of_leaves <= 0) {
            const salaryperday = basicsalary / numberOfDaysInMonth;
            const deduction = salaryperday * leaves;
            setLeaveAmount(deduction.toFixed(2));
          }

          setTotalLeaves(leaves);
        }
        if (leaves === 0 || leaves === "") {
          setLeaveAmount(0);
          setTotalLeaves(0);
        }
      } catch (error) {
        console.error("Error fetching leave data:", error);
      }
    };

    fetchData();
  }, [salaryMonth, selectedEmployee]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(baseUrl + "/Emp/GetAllEmployees");
      setEmployees(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleGenerateSalary = async () => {
    if (!selectedEmployee || !salaryMonth || !basicsalary) {
      alert("Please fill all required fields.");
      return;
    }

    const salaryYear = salaryMonth.getFullYear();
    const salaryMonthNumber = salaryMonth.getMonth() + 1;

    // Calculate the final salary
    const finalSalary =
      parseFloat(basicsalary) +
      parseFloat(hrAllowance) +
      parseFloat(daAllowance) -
      parseFloat(leaveAmount);
    setTotalSalary(finalSalary.toFixed(2)); // Round to 2 decimal places

    const salaryData = {
      empid: selectedEmployee.value,
      salaryYear,
      salaryMonth: salaryMonthNumber,
      salaryAmount: finalSalary.toFixed(2),
      basicsalary: basicsalary,
      hrAllowance: hrAllowance,
      daAllowance: daAllowance,
      leaveAmount: leaveAmount,
    };

    try {
      //Save salary details to the database
      await axios.post(baseUrl + "/Salary/SaveSalary", salaryData);

      //Generate and save PDF (using jspdf)
      context?.generateAndSavePDF(salaryData);

      // const response = await axios.post(baseUrl + `/Salary/SaveSalary/${selectedEmployee.value}`, salaryData);
      // context?.generateAndSavePDF(response.data);

      alert("Salary generated and saved successfully!");
    } catch (error) {
      console.error("Error generating salary:", error);
      alert("Error generating salary. Please try again later.");
    }
  };

  const handleEmployeeSelect = async (selectedOption) => {
    setSelectedEmployee(selectedOption);
    setBasicSalary(0);
    setSalaryMonth(null);
    setLeaveAmount(0);

    try {
      //   const response = await axios.get(baseUrl+ `/Emp/GetSingleEmp/${selectedOption.value}/${salaryYear}/${salaryMonthNumber}`);
      const response = await axios.get(
        baseUrl + `/Emp/GetSingleEmp/${selectedOption.value}`
      );
      if (response.data) {
        setBasicSalary(response.data.salary);
        setEmp(response.data);
      } else {
        setBasicSalary("");
      }
    } catch (error) {
      console.error("Error fetching employee salary:", error);
      setBasicSalary("");
    }
  };

  console.log("Selcted emp is : " + JSON.stringify(emp));

  return (
    <Container className="mx-auto">
      <Row>
        <Col md={10} className="offset-md-2">
          <h2>Generate Salary and Save as PDF</h2>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Select Employee:
              </Form.Label>
              <Col sm="6">
                <Select
                  options={employees.map((employee) => ({
                    value: employee.empid,
                    label: employee.empname,
                  }))}
                  value={selectedEmployee}
                  onChange={handleEmployeeSelect}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Salary Month:
              </Form.Label>
              <Col sm="6">
                <DatePicker
                  className="form-select"
                  selected={salaryMonth}
                  onChange={(date) => setSalaryMonth(date)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Basic Salary Amount:
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  type="number"
                  value={basicsalary}
                  onChange={(e) => setBasicSalary(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                HR Allowance:
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  type="number"
                  value={hrAllowance}
                  onChange={(e) => setHrAllowance(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                DA Allowance:
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  type="number"
                  value={daAllowance}
                  onChange={(e) => setDaAllowance(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Leave Amount Deduction:
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  type="number"
                  value={leaveAmount}
                  onChange={(e) => setLeaveAmount(e.target.value)}
                />
                <small className="text-danger">
                  Total leaves : {totalleaves} days
                </small>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Total Salary:
              </Form.Label>
              <Col sm="6">
                <Form.Control type="number" value={totalSalary} readOnly />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Col sm={6} className="offset-2">
                <Button
                  variant="primary"
                  className="float-end"
                  onClick={handleGenerateSalary}
                >
                  Generate Salary & Save as PDF
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
