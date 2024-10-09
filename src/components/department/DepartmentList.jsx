
import React, { useEffect, useState } from 'react'
import AddDepartment from './AddDepartment'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'

import base_URL from '../../helper'
import { userData } from '../../context/TheContext'
import { columns, ActionButton } from './DepartmentHelper'


function DepartmentList() {
  const {token}=userData()
  const [deptList, setDeptList] =useState([])

  const [filter, setFilter]=useState([])  
 
 

  useEffect(()=>{
     const fetchDeptList=async()=>{

      try{
        const resData= await fetch(`${base_URL}/api/department`,{
          method:"GET",      
          headers:{
              "Content-Type":"application/json",
              "Authorization":`Bearer ${token}`
          }
      })
    
        const getDeptData = await resData.json()

        if(getDeptData.success)
        {
          let sno=1;
           const newData= getDeptData.department.map((dept)=>{
              return({
                _id:dept._id,
                sno:sno++,
                dept_name:dept.dept_name,
                action:<ActionButton id={dept._id} />

              })
           })
           setDeptList(newData)
           setFilter(newData)
        
        }
        


      }    
    catch(err){
        console.log("error",err)
    }


    }
    fetchDeptList()

  },[])
 

  // Search Items

  function searchDepartment(e){


    const newFilterData = deptList.filter((dep)=>{
      return dep.dept_name.toLowerCase().includes(e.target.value.toLowerCase())
    })

    setFilter(newFilterData)

  }


  return (
   <div className="departmentlist-container">
  
    <div className="departmentlist-section">
      <h3>Department Overview</h3>
      <div className="departmentlist-banner">
        <input className='departmentlist-search' type="search" placeholder='Search by Department Name' onChange={searchDepartment}/>
        <div className="departmentlist-btn">
         <Link to="/admindashboard/adddepartment"><button >Add Department </button> </Link> 
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

export default DepartmentList