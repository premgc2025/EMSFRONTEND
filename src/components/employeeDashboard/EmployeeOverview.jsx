
import { FaTachometerAlt, FaUser } from 'react-icons/fa'
import React, { useState } from 'react'
import base_URL from '../../helper'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { userData } from '../../context/TheContext'

function EmployeeOverview() {

  const {id} = useParams()  
  const {token, loginId}=userData()
  const [employee, setEmployee] = useState({})
  const [loading, setLoading] = useState(false)



  useEffect(()=>{
    const fetchDeptList=async()=>{
        setLoading(true)
        

     try{
       
       const resData= await fetch(`${base_URL}/api/employee/${loginId}`,{
         method:"GET",      
         headers:{
             "Content-Type":"application/json",
             "Authorization":`Bearer ${token}`
         }
     })
  
   
       const getData = await resData.json()
       console.log("image URL in",getData.getEmployee.userId.profileImage)

  

          setEmployee({               
          
            name:getData.getEmployee.userId.name,
            profileImage:getData.getEmployee.userId.profileImage ,
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
    <div className='employeeoverview' >

    <div>  Employee Overview</div>
    <div className="employeeview">
        <div className="employeeview-image">
            <img src={employee.profileImage} alt="Image" className='empview-img'/>
        </div>
   
    </div>
    </div>
  )
}

export default EmployeeOverview