
import React, { useState } from 'react'
import { userData } from '../../context/TheContext'
import base_URL from '../../helper.js'
import { useNavigate } from 'react-router-dom'

function AddDepartment() {
    const {token} = userData()
    const navigate = useNavigate()
  
    const [deptData,setDeptData]=useState({
        dept_name:"",
        description:""
    })


    function deptOnchanged(e){
        const {name,value} = e.target

        setDeptData((preValue)=>{
            return {...preValue,[name]:value}
        })
    }

function submitHandle(e){
    e.preventDefault()
      

        fetch(`${base_URL}/api/department`,{
            method:"POST",
            body:JSON.stringify(deptData),
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        })
        .then((response)=>{
          
            return response.json()
        })
        .then((data)=>{
          
            navigate('/admindashboard/departmentlist')
        })
        .catch((err)=>{
            console.log("error",err)
        })

}

  return (
   <div className="adddepartment-container">
    <div className="adddeparment-section">
        <form action="" className='adddepartment-form' onSubmit={submitHandle}>
            <div className="adddepartment-inp">
                <label htmlFor="deptid">Department Name</label>
                <input className='adddepartment-inp' type="text" id="deptid" name="dept_name" onChange={deptOnchanged} value={deptData.dept_name} required/>
            </div>
            <div className="adddepartment-inp">
                <label htmlFor="deptdes">Description</label>
                <textarea className='adddepartment-inp' name="description" id="deptdes" rows="10" cols="30"onChange={deptOnchanged} value={deptData.description} required/> 
            </div>
            <button className='adddepartment-btn'>Add Department</button>
        </form>
    </div>
   </div>
  )
}

export default AddDepartment