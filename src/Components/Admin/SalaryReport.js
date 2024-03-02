import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { baseUrl } from "../../App";
import { PdfGenerator } from "../Context/PdfContext";

export default function SalaryReport() {

  const [salaryList, setSalaryList] = useState([]);

  const context = PdfGenerator()

  useEffect(() => {
    axios
      .get(baseUrl + `/Salary/GetAllSalary`)
      .then((res) => {
        setSalaryList(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  });
  return (
    <Container>
      <table className="table hover text-center">
        <thead className="text-primary">
          <tr>
            <th>Id</th>
            <th>EMP ID</th>
            <th>Salary</th>
            <th>Month, Year</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {salaryList.map((salary) => {
            return <tr key={salary.id}>
              <td>{salary.id}</td>
              <td>{salary.empid}</td>
              <td>{salary.salaryAmount}</td>
              <td>{salary.salaryMonth} - {salary.salaryYear}</td>
              <td><button className="btn btn-secondary" onClick={()=>context?.generateAndSavePDF(salary)}>Download Pdf</button></td>
            </tr>;
          })}
        </tbody>
      </table>
    </Container>
  );
}
