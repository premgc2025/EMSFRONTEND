

import React, { useEffect, useState } from 'react'

import { Link, useNavigate, useParams, } from 'react-router-dom'
import DataTable from 'react-data-table-component'

import base_URL from '../../helper'
import { userData } from '../../context/TheContext'
import moment from 'moment'
import { ActionButton, columns } from './LeaveHealper'


function LeaveAll() {
  const navigate = useNavigate()
    const {token,loginId}=userData()
    const [leaveList, setLeaveList] =useState([])
  
    const [filter, setFilter]=useState([])  

    
  useEffect(()=>{
    const fetchDeptList=async()=>{

     try{
       const resData= await fetch(`${base_URL}/api/leave`,{
         method:"GET",      
         headers:{
             "Content-Type":"application/json",
             "Authorization":`Bearer ${token}`
         }
     })
   
       const getData = await resData.json()

 
       if(getData.success)
       {
         let sno=1;
          const newData= getData.getLeaveData.map((leave)=>{
             return({
              id:leave._id,
              sno:sno++,
              name:leave.userId.name,
              employeeId:leave.employeeId.employeeId,
              typeofleave:leave.typeofleave,
              startdate:moment(leave.startdate).format('YYYY-MM-DD'),
              enddate:moment(leave.enddate).format('YYYY-MM-DD'),
              days:(new Date(leave.enddate).getDate()-new Date(leave.startdate).getDate())+1,
              applydate:moment(leave.applydate).format('YYYY-MM-DD'),
              status:leave.status,
              action:<ActionButton leaveId={leave._id} />
             
             })
          })
          setLeaveList(newData)
          setFilter(newData)
       
       }
       


     }    
   catch(err){
       console.log("error",err)
   }


   }
   fetchDeptList()

 },[])

    
  function search(e){
    const newFilterData = leaveList.filter((dep)=>{
      
      return dep.name.toLowerCase().includes(e.target.value.toLowerCase())
    })

    setFilter(newFilterData)

  }

  function filterButton(status){
    const newFilterData = leaveList.filter((dep)=>{
   
      return dep.status.toLowerCase().includes(status.toLowerCase())
    })

    setFilter(newFilterData)
  

  }

  // Refresh Table 
   function refreshTable(e){
    setFilter(leaveList)
   }
   
    return (
        <div className="departmentlist-container">
       
         <div className="departmentlist-section">
           <h3>Leave Details</h3>
           <div className="departmentlist-banner">
             <input className='departmentlist-search' type="search" placeholder='Search by  Name' onChange={search}/>
             <div className="leave-approve-btn">
              <p>Filter by </p>
              <div className="leave-filter-btn">
              <button className='leave-filter-allbtn' onClick={()=>{
               refreshTable()
              }}>All</button>
              <button className='leave-filter-allbtn' onClick={()=>{
                filterButton("Approve")
              }}>Approve</button>
              <button className='leave-filter-allbtn' onClick={()=>{
                filterButton("Reject")
              }}>Reject</button>
              <button className='leave-filter-allbtn' onClick={()=>{
                filterButton("Pending")
              }}>Pendding</button>
              </div>
              
             </div>
           </div>
         </div>
        
     
         <div >
       
         
         </div>
         <DataTable
         columns={columns}
         data={filter}
         pagination
       />
     
        </div>
     
       )
}

export default LeaveAll;