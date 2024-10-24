
import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'

import base_URL from '../../helper'
import { userData } from '../../context/TheContext'
import { ActionButton, columns } from './EmployeeHealper'

// import { columns, ActionButton } from './DepartmentHelper'



function ListEmployee() {
  const {token}=userData()
  const [empList, setEmpList] =useState([])

  const [filter, setFilter]=useState([])


  useEffect(()=>{
     const fetchDeptList=async()=>{

      try{
        const resData= await fetch(`${base_URL}/api/employee`,{
          method:"GET",      
          headers:{
              "Content-Type":"application/json",
              "Authorization":`Bearer ${token}`
          }
      })
     
    
        const geData = await resData.json()

        if(geData.success)
        {
          let sno=1;
           const newData= geData.getEmployee.map((emp)=>{
              return({
                _id:emp._id,
                sno:sno++,
                name:emp.userId.name,
                profileImage:<img src={emp.userId.profileImage} className='emp-image'/>,
                departmentId:emp.departmentId.dept_name,
                dob:new Date(emp.dob).toLocaleDateString(),
                action:<ActionButton id={emp._id}/>

              })
           })
           setEmpList(newData)
           setFilter(newData)
        
        }
        


      }    
    catch(err){
        console.log("error",err)
    }
    }
    fetchDeptList()

  },[])

// Filter Data by Name
  function searchEmployee(e){


    const newFilterData = empList.filter((dep)=>{
     
      return dep.name.toLowerCase().includes(e.target.value.toLowerCase())
    })

    setFilter(newFilterData)

  }


  return (
   <div className="departmentlist-container">
  
    <div className="departmentlist-section">
      <h3>Department Overview</h3>
      <div className="departmentlist-banner">
        <input className='departmentlist-search' type="search" placeholder='Search by Name' onChange={searchEmployee}/>
        <div className="departmentlist-btn">
         <Link to="/admindashboard/addemployee"><button >Add Employee </button> </Link> 
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

export default ListEmployee;