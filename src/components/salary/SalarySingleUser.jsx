import React from 'react'
import { useState } from 'react'
import base_URL from '../../helper'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { userData } from '../../context/TheContext'
import DataTable from 'react-data-table-component'
import { columns } from './SalaryHelper'
import moment from 'moment'




function SalarySingleUser() {
    const {token}=userData()
    const {id}= useParams()
 
   
    const [salaryList, setSalaryList] = useState([])
  
    const [filter, setFilter]=useState([])

  
    useEffect(()=>{
       const fetchDeptList=async()=>{
  
        try{
          const resData= await fetch(`${base_URL}/api/salary/${id}`,{
            method:"GET",      
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        })
     
      
          const geData = await resData.json()
  
        console.log("Salary data final",geData.salaryData)
          if(geData.success)
          {
            let sno=1;
             const newData= geData.salaryData.map((salary)=>{
                return({
                  _id:salary._id,
                  sno:sno++,
                  departmentId:salary.departmentId.dept_name,
                  employeeId:salary.employeeId.employeeId,                  
                  basicsalary:salary.basicsalary,
                  allowance:salary.allowance,
                  deduction:salary.deduction,
                  netsalary:salary.netsalary,
                  paydate:moment(salary.paydate).format('YYYY-MM-DD')
                 
  
                })
             })
             setSalaryList(newData)
             setFilter(newData)
          
          }
          
  
  
        }    
      catch(err){
          console.log("error",err)
      }
      }
      fetchDeptList()
  
    },[])
  
//   Filter Data by Name
    function searchSalary(e){
  
  
      const newFilterData = salaryList.filter((dep)=>{
       
        return dep.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
      })
  
      setFilter(newFilterData)
  
    }
  
  
    return (
     <div className="departmentlist-container">
    
      <div className="departmentlist-section">
        <h3>Salary Overview</h3>
        <div className="departmentlist-banner">
          <input className='departmentlist-search' type="search" placeholder='Search by Employee ID' onChange={searchSalary}/>
          {/* <div className="departmentlist-btn">
           <Link to="/admindashboard/addsalary"><button >Add Salary </button> </Link> 
       
          </div> */}
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
  


export default SalarySingleUser;