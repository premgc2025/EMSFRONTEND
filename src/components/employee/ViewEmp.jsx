
import React, { useState } from 'react'
import base_URL from '../../helper'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { userData } from '../../context/TheContext'


function ViewEmp() { 
    const {id} = useParams()  
    const {token}=userData()
    const [employee, setEmployee] = useState({})
    const [loading, setLoading] = useState(false)
  
  

    useEffect(()=>{
        const fetchDeptList=async()=>{
            setLoading(true)
   
         try{
           
           const resData= await fetch(`${base_URL}/api/employee/${id}`,{
             method:"GET",      
             headers:{
                 "Content-Type":"application/json",
                 "Authorization":`Bearer ${token}`
             }
         })
      
       
           const getData = await resData.json()
   
      
    
              setEmployee({               
              
                name:getData.getEmployee.userId.name,
                profileImage:getData.getEmployee.userId.profileImage,
                departmentId:getData.getEmployee.departmentId.dept_name,
                dob:new Date(getData.getEmployee.dob).toLocaleDateString(),
                designation:getData.getEmployee.designation,
                employeeId : getData.getEmployee.employeeId,
                gender:getData.getEmployee.gender,
                salary:getData.getEmployee.salary,
               

              })
           
              setLoading(false)
   
         }    
       catch(err){
           console.log("error",err)
       }
       }
       fetchDeptList()
   
     },[])




  return (

    loading ? <div>Loading...</div> :
    <div className="employeeview-container">
        <h3 className='emp-profile'>Employee Profile</h3>
    <div className="employeeview">
        <div className="employeeview-image">
            <img src={`${base_URL}/${employee.profileImage}`} alt="Image" className='empview-img'/>
        </div>
        <div className="employeeview-content">
        <p>Name: {employee.name}</p>
            <p>Employee ID: {employee.employeeId}</p>
            <p>Department: {employee.departmentId}</p>
            <p>Desgination: {employee.designation}</p>
            <p>Date of Birth: {new Date(employee.dob).toLocaleDateString()}</p>
            <p>Gender: {employee.gender}</p>
            <p>Salary: {employee.salary}</p>
        </div>
            
    </div>

</div>
  )
}


export default ViewEmp