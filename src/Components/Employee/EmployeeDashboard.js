import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { baseUrl } from "../../App";
import ErrorPage from "../Login/ErrorPage";
import ChangePassowrd from "../Utils/ChangePassword";

const EmployeeDashboard = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [emp, setEmp]= useState(null)
  const navigate = useNavigate();

  const [show, setShow] = useState(false)

  const toggle = () =>{
    setShow(!show);
  }

  // useEffect(()=>{
  //   axios.get(baseUrl+`/Emp/GetSingleEmp/${user.empid}`)
  //   .then(res=>{
  //     setEmp(res.data)
  //   })
  //   .catch(err=>{
  //     console.log(err);
  //   })
  // })

  function Logout() {
    sessionStorage.clear();
    navigate("/");
  }

  if (!user) {
    return <ErrorPage />;
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Container fluid>
          <div>
            <span className="navbar-brand fw-bold fs-4 text-white">
              Welcome {user?.empname}
            </span>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav ms-auto" style={{ maxHeight: "100px" }}>
              <div className="d-flex my-1 justify-content-center">
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/empdashboard">
                   Request Leave
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white"
                    to="/empdashboard/viewleaves"
                  >
                    View Leaves
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/empdashboard/empsalary">
                    Salary Report
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" onClick={toggle}>
                    Change Password
                  </Link>
                </li>
                <ChangePassowrd show={show} toggle={toggle} usertype="emp"/>
                <li className="nav-item">
                  <Link className="btn btn-outline-light" to="/" onClick={Logout}>
                    Logout
                  </Link>
                </li>
              </div>
            </ul>
          </div>
        </Container>
      </nav>
      <div className="float-end m-2 fs-4 text-danger">Remaining Leaves : {" "}{user?.no_of_leaves}</div>
      <Outlet />
    </div>
  );
};

export default EmployeeDashboard;
