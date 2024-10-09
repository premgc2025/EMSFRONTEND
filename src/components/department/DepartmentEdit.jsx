
import React, { useState } from 'react'
import { userData } from '../../context/TheContext'
import base_URL from '../../helper.js'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

function DepartmentEdit() {
    const {id} =useParams()
    const {token} = userData()
    const navigate = useNavigate()
   
    const[item,setItem]=useState({})
    const [deptData,setDeptData]=useState({
        dept_name:"",
        description:""
    })
 
console.log("pre ITem deptData",deptData)

    useEffect(()=>{
        const fetchDeptList=async()=>{
   
         try{
           const resData= await fetch(`${base_URL}/api/department/${id}`,{
             method:"GET",      
             headers:{
                 "Content-Type":"application/json",
                 "Authorization":`Bearer ${token}`
             }
         })
       
        
          
            const getDeptData = await resData.json()
    
             setItem(getDeptData.department)
         
        
             
           
           
         }    
       catch(err){
           console.log("error",err)
       }
       }
       fetchDeptList()
   
     },[])


    function deptOnchanged(e){
        const {name,value} = e.target

        setDeptData((preValue)=>{
            return {...preValue,[name]:value}
        })
    }


function submitHandle(e){
    e.preventDefault()
      

        fetch(`${base_URL}/api/department/${id}`,{
            method:"PUT",
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
                <input className='adddepartment-inp' type="text" id="deptid" name="dept_name" onChange={deptOnchanged} defaultValue={item.dept_name} required/>
            </div>
            <div className="adddepartment-inp">
                <label htmlFor="deptdes">Description</label>
                <textarea className='adddepartment-inp' name="description" id="deptdes" rows="10" cols="30"onChange={deptOnchanged} defaultValue={item.description} required/> 
            </div>
            <button className='adddepartment-btn'>Update Department</button>
        </form>
    </div>
   </div>
  )
}

export default DepartmentEdit;