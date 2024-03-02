import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ErrorPage from "../Login/ErrorPage";
import ChangePassowrd from "../Utils/ChangePassword";

const AdminDashboard = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const toggle = () => {
    setShow(!show);
  };

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
              Welcome {user?.adminid}
            </span>
          </div>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav ms-auto" style={{ maxHeight: "100px" }}>
              <div className="d-flex my-1 justify-content-center">
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/admindashboard">
                    Add Employee
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white"
                    to="/admindashboard/viewemp"
                  >
                    View Employee
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white"
                    to="/admindashboard/viewleaves"
                  >
                    View Leaves
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white"
                    to="/admindashboard/action"
                  >
                    Approve / Reject Leaves
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white"
                    to="/admindashboard/generatesalary"
                  >
                    Generate Salary
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white"
                    to="/admindashboard/salaryreport"
                  >
                    View Report
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white"
                    to="/admindashboard/addadmin"
                  >
                    Add Admin
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" onClick={toggle}>
                    Change Password
                  </Link>
                </li>
                <ChangePassowrd show={show} toggle={toggle} usertype="admin" />
                <li className="nav-item">
                  <Link
                    className=" btn btn-outline-light"
                    to="/"
                    onClick={Logout}
                  >
                    Logout
                  </Link>
                </li>
              </div>
            </ul>
          </div>
        </Container>
      </nav>
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
