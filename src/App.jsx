
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from './components/Register'
import Login from './components/Login'
import AdminDashboard from './pages/AdminDashboard'
import Demo from './components/Demo'
import Private from './protection/Private'
import AdminPanelOverview from './components/adminDComponent/AdminPanelOverview'
import DepartmentList from './components/department/DepartmentList'
import AddDepartment from './components/department/AddDepartment'
import DepartmentEdit from './components/department/DepartmentEdit'
import ListEmployee from './components/employee/ListEmployee'
import AddEmployee from './components/department/AddEmplouee'

import ViewEmp from './components/employee/ViewEmp'
import EditEmp from './components/employee/EditEmployee'
import SalaryList from './components/salary/SalaryList'
import AddSalary from './components/salary/AddSalary'
import EmployeeDashboard from './pages/EmployeeDashboard'
import Leave from './components/employeeDashboard/Leave'
import AddLeave from './components/employeeDashboard/AddLeave'
import EmployeeOverview from './components/employeeDashboard/EmployeeOverview'
import SalarySingleUser from './components/salary/SalarySingleUser'
import ResetPassword from './components/setting/ResetPassword'
import LeaveAll from './components/employeeDashboard/LeaveAll'
import LeaveViewAdmin from './components/employeeDashboard/LeaveViewAdmin'
import RoleBuilding from './protection/RoleBuilding'



function App() {

  return (
    <>
      <div className="main-container">

      </div>

      <BrowserRouter>
        <Routes>


          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admindashboard" element={
            <Private>
              <RoleBuilding requiredRole="admin">

                <AdminDashboard />
              </RoleBuilding>
            </Private>
          }>
            <Route index element={<AdminPanelOverview />} />
            <Route path='departmentlist' element={<DepartmentList />} />
            <Route path='adddepartment' element={<AddDepartment />} />
            <Route path='departmentedit/:id' element={<DepartmentEdit />} />
            <Route path='listemployee' element={<ListEmployee />} />
            <Route path='addemployee' element={<AddEmployee />} />
            <Route path='viewemployee/:id' element={<ViewEmp />} />
            <Route path='editemployee/:id' element={<EditEmp />} />
            <Route path='salarylist' element={<SalaryList />} />
            <Route path='salarylist/:id' element={<SalarySingleUser />} />
            <Route path='addsalary' element={<AddSalary />} />
            <Route path='resetpassword/:id' element={<ResetPassword />} />
            <Route path='leave' element={<LeaveAll />} />
            <Route path='leave/:id' element={<Leave />} />
            <Route path='leaveviewadmin/:id' element={<LeaveViewAdmin />} />

          </Route>

          <Route path="/demo" element={
            <Private>

              <Demo />

            </Private>} />

          <Route path='/employeedashboard' element={
            <Private>
              <EmployeeDashboard />
            </Private>

          } >
            <Route index element={<EmployeeOverview />} />
            <Route path='leave/:id' element={<Leave />} />
            <Route path='view/:id' element={<ViewEmp />} />
            <Route path='addleave' element={<AddLeave />} />
            <Route path='salary/:id' element={<SalarySingleUser />} />
            <Route path='resetpassword/:id' element={<ResetPassword />} />
          </Route>
        </Routes>


      </BrowserRouter>



    </>
  )
}

export default App
