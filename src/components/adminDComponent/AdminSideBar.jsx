
import React from 'react'
import { FaBuilding, FaCalendar, FaCogs, FaTachometerAlt, FaUser, FaUsers } from 'react-icons/fa'
import { FaMoneyBill1Wave } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'
import { userData } from '../../context/TheContext'

function AdminSideBar() {
  const {loginId} = userData()
  return (
    <div className="sidebar-container">
        <div className="sidebar-section">
            <h3 className='dashboard-title'>Employee Management System</h3>
            <div className="sidebar-menu">
              <NavLink to='/admindashboard' className={({isActive})=> `${isActive ? "active":""} "sidebar-header"`} end> 
              <FaTachometerAlt/>
                <span>Admin Dashboard</span>
                </NavLink>

              <NavLink to='/admindashboard/listemployee' className={({isActive})=> `${isActive ? "active":""} "sidebar-header"`} end> 
              <FaUsers/>
                <span>Employees</span>
                </NavLink>

              <NavLink to='/admindashboard/departmentlist' className={({isActive})=> `${isActive ? "active":""} "sidebar-header"`} end> 
              <FaBuilding/>
                <span>Department</span>
                </NavLink>

              <NavLink to={`/admindashboard/leave`} className={({isActive})=> `${isActive ? "active":""} "sidebar-header"`} end> 
                  <FaCalendar/>
                    <span>Leave</span>
                    </NavLink>

                <NavLink to='/admindashboard/salarylist' className={({isActive})=> `${isActive ? "active":""} "sidebar-header"`} end> 
                <FaMoneyBill1Wave/>
                <span>Salary</span>
                </NavLink>


                <NavLink to={`/admindashboard/resetpassword/${loginId}`} className={({isActive})=> `${isActive ? "active":""} "sidebar-header"`} end> 
                  <FaCogs/>
                    <span>Reset Password</span>
                    </NavLink>
            </div>
        </div>
    </div>
  )
}

export default AdminSideBar