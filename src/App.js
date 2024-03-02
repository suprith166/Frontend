import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AddEmployee from "./Components/Admin/AddEmployee";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import ApproveReject from "./Components/Admin/ApproveReject";
import NewAdmin from "./Components/Admin/NewAdmin";
import SalaryGenerate from "./Components/Admin/SalaryGenerate";
import SalaryReport from "./Components/Admin/SalaryReport";
import ViewEmployee from "./Components/Admin/ViewEmployee";
import PdfContext from "./Components/Context/PdfContext";
import EmployeeDashboard from "./Components/Employee/EmployeeDashboard";
import EmpSalary from "./Components/Employee/EmpSalary";
import LeaveRequest from "./Components/Employee/LeaveRequest";
import Login from "./Components/Login/Login";
import ViewLeaves from "./Components/Utils/ViewLeaves";

export const baseUrl = "http://localhost:8080";

function App() {
  return (
    <div>
      <BrowserRouter>
        <PdfContext>
          <ToastContainer  position="top-center"/>
          <Routes>
            <Route path="" element={<Login />} />
            <Route path="admindashboard" element={<AdminDashboard />}>
              <Route path="" element={<AddEmployee />} />
              <Route path="viewemp" element={<ViewEmployee />} />
              <Route path="viewleaves" element={<ViewLeaves />} />
              <Route path="action" element={<ApproveReject />} />
              <Route path="generatesalary" element={<SalaryGenerate />} />
              <Route path="salaryreport" element={<SalaryReport />} />
              <Route path="addadmin" element={<NewAdmin />} />
            </Route>
            <Route path="empdashboard" element={<EmployeeDashboard />}>
              <Route path="" element={<LeaveRequest />} />
              <Route path="viewleaves" element={<ViewLeaves />} />
              <Route path="empsalary" element={<EmpSalary />} />
            </Route>
          </Routes>
        </PdfContext>
      </BrowserRouter>
    </div>
  );
}

export default App;
