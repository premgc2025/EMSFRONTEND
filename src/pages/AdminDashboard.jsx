
import React from 'react'
import AdminNavBar from '../components/adminDComponent/AdminNavBar'
import { Outlet } from 'react-router-dom'
import AdminSideBar from '../components/adminDComponent/AdminSideBar'



function AdminDashboard() {



  return (
  
    <div className="admindashboard-container">
      <div className="admindashboard-section">
        <div className="adminsidebar">
      <AdminSideBar/>

        </div>
        <div className="admin-navbar">
          <AdminNavBar/>
        <Outlet/>

        </div>
     
       

      </div>
      
     

    </div>

   
  )
}

export default AdminDashboard