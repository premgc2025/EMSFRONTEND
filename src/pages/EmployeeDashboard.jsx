
import React from 'react'
import Sidebar from '../components/employeeDashboard/Sidebar'
import Navbar from '../components/employeeDashboard/navbar'
import { Outlet } from 'react-router-dom'


function EmployeeDashboard() {
    return (
  
        <div className="admindashboard-container">
          <div className="admindashboard-section">
            <div className="adminsidebar">
         <Sidebar/>
    
            </div>
            <div className="admin-navbar">
              <Navbar/>
           <Outlet/>
    
            </div>
         
           
    
          </div>
          
         
    
        </div>
    
       
      )
}

export default EmployeeDashboard