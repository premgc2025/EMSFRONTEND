
import React, { useEffect, useState } from 'react'
import ReportCard from '../reportCard/ReportCard'
import { FaBuilding, FaCheck, FaMoneyBill, FaRemoveFormat, FaUser, FaUsers, FaWpforms } from 'react-icons/fa'
import { FaHourglassHalf, FaX } from 'react-icons/fa6'
import base_URL from '../../helper'
import { userData } from '../../context/TheContext'



function AdminPanelOverview() {
    const {token} =userData()
    const [summaryData, setSummaryData] = useState({})
   

  useEffect(()=>{  
    adminSummary()
  },[])

    const adminSummary =async ()=>{

      try{
        const summaryData = await fetch(`${base_URL}/api/adminsummary`,{
          method:"GET",      
         headers:{
             "Content-Type":"application/json",
             "Authorization":`Bearer ${token}`
         }
        })
       
        const newData = await summaryData.json()
       if(newData.success===true)
       {
        
        setSummaryData({
          totalEmployee:newData.totalEmployee,
          totalDepartment:newData.totalDepartment,
          totalSalary:newData.totalSalary,
          totalLeave:newData.leaveSummary.totalLeave,
          approve:newData.leaveSummary.approve,
          pending:newData.leaveSummary.pending,
          reject:newData.leaveSummary.reject,
        })
       }
        

      }
      catch(err){
        console.log(err)
      }

    }

  return (
    <div className="adminpaneloverview-container">
        <h3>Dashboard Overview</h3>
        <div className="adminpaneloverview-section">

       
        <div className="overview-card">
            <ReportCard icon={<FaUsers/>} text="Total Employees" number={summaryData.totalEmployee} iconclass="reportcard-bgcGreen" />
        </div>

        <div className="overview-card">
            <ReportCard icon={<FaBuilding/>} text="Total Departments" number={summaryData.totalDepartment} iconclass="reportcard-bgcGray" />
        </div>

        <div className="overview-card">
            <ReportCard icon={<FaMoneyBill/>} text="Monthly Pay" number={` Rs. ${summaryData.totalSalary}`} iconclass="reportcard-bgcRed" />
        </div>
        </div>


        <h3>Leave Details</h3>
        <div className="leavedetails-section">

       
        <div className="overview-card">
            <ReportCard icon={<FaWpforms/>} text="Leave Applied" number={summaryData.totalLeave} iconclass="reportcard-bgcGreen" />
        </div>
        <div className="overview-card">
            <ReportCard icon={<FaCheck/>} text="Leave Approved" number={summaryData.approve} iconclass="reportcard-bgcGreen" />
        </div>

        <div className="overview-card">
            <ReportCard icon={<FaHourglassHalf/>} text="Leave Panding" number={summaryData.pending} iconclass="reportcard-bgcYellow" />
        </div>

        <div className="overview-card">
            <ReportCard icon={<FaX/>} text="Leave Rejact" number={summaryData.reject} iconclass="reportcard-bgcRed" />
        </div>
        </div>



    </div>
  )
}

export default AdminPanelOverview