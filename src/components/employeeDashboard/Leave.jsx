import React, { useEffect, useState } from 'react'

import { Link, useParams } from 'react-router-dom'
import DataTable from 'react-data-table-component'

import base_URL from '../../helper'
import { userData } from '../../context/TheContext'
import moment from 'moment'
import { columns } from './LeaveHealper'


function Leave() {
    const {token,loginId,role}=userData()
    const {id} = useParams()
    const [leaveList, setLeaveList] =useState([])
  
    const [filter, setFilter]=useState([])  

    
  useEffect(()=>{
    const fetchDeptList=async()=>{

     try{
       const resData= await fetch(`${base_URL}/api/leave/${id}`,{
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
              applydate:moment(leave.applydate).format('YYYY-MM-DD'),
              days:(new Date(leave.enddate).getDate()-new Date(leave.startdate).getDate())+1,
              status:leave.status
             
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

    return (
        <div className="departmentlist-container">
       
         <div className="departmentlist-section">
           <h3>Leave Details</h3>
           <div className="departmentlist-banner">
             <input className='departmentlist-search' type="search" placeholder='Search by Name' onChange={search}/>
            
             <div className="departmentlist-btn">
              <Link to="/employeedashboard/addleave"><button >Add Leave </button> </Link> 
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

export default Leave;