import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { PiUsersFill } from "react-icons/pi";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../App";
import { toast } from "react-toastify";

export default function Login() {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState("");

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    const obj = { userid,password,usertype };
    axios
      .post(baseUrl + "/Auth/LoginVerify", obj)
      .then((res) => {
        toast.success("Login successfully");
        console.log(res);
        sessionStorage.setItem("user", JSON.stringify(res.data));
        if (usertype === "Admin") {
          navigate("/admindashboard");
        } else {
          navigate("/empdashboard");
        }
      })
      .catch((error) => {
        toast.error(error.response?.data);
        console.log(error);
      });
  }

  return (
    <div  className="row m-0">
      <div className="col-lg-6 bg-danger" style={{ height: "100vh" }}>
        <h1 className="text ">Payroll Management System</h1>
      </div>
      <div className="col-lg-6 " style={{ height: "100vh" }}>
        <div className="log1" style={{ width: "25rem" }}>
          <Card.Body>
            <Card.Title className="text-center">
              <h1 className="text-danger">Login</h1>
            </Card.Title>
            <div>
              <form onSubmit={handleLogin}>
                <div className="input-group my-4">
                  <span className="input-group-text">
                    <PiUsersFill />
                  </span>
                  <select
                    className="form-select text-center"
                    value={usertype}
                    onChange={(e) => setUsertype(e.target.value)}
                    required
                  >
                    <option value="" hidden>
                      ---Select usertype---
                    </option>
                    <option value="Admin">
                      Admin
                    </option>
                    <option value="Employee">
                      Employee
                    </option>
                  </select>
                </div>
                <div className="input-group my-4">
                  <span className="input-group-text">
                    <FaUserAlt />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Admin ID/Employee ID"
                    value={userid}
                    onChange={(e) => setUserid(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group my-4">
                  <span className="input-group-text">
                    <RiLockPasswordFill />
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </div>
              </form>
            </div>
          </Card.Body>
        </div>
      </div>
    </div>
  );
}
