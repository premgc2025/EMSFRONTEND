
import React from 'react'
import AdminSideBar from '../components/adminDComponent/adminSideBar'
import AdminNavBar from '../components/adminDComponent/AdminNavBar'
import AdminPanelOverview from '../components/adminDComponent/AdminPanelOverview'
import { Outlet } from 'react-router-dom'



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