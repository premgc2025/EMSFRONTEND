import React, { useState } from 'react'
import base_URL from '../../helper'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { userData } from '../../context/TheContext'
import moment from 'moment'


function LeaveViewAdmin() {
    const navigate = useNavigate()
    const {id} = useParams()
   
    const {token}=userData()
    const [leave, setLeave] = useState({})
    const [loading, setLoading] = useState(false)
  
   
  

    useEffect(()=>{
        const fetchDeptList=async()=>{
            setLoading(true)
   
         try{
          
           const resData= await fetch(`${base_URL}/api/leavedetail/${id}`,{
             method:"GET",      
             headers:{
                 "Content-Type":"application/json",
                 "Authorization":`Bearer ${token}`
             }
         })
      
       
           const getData = await resData.json()
           const {leaveData} = getData
   
       
    
              setLeave({               
                leaveId:leaveData._id,
                name:leaveData.employeeId.userId.name,
                profileImage:leaveData.employeeId.userId.profileImage,
                departmentId:leaveData.employeeId.departmentId.dept_name,
                dob:new Date(leaveData.employeeId.dob).toLocaleDateString(),
                designation:leaveData.employeeId.designation,
                employeeId : leaveData.employeeId.employeeId,
                gender:leaveData.employeeId.gender,
                reason:leaveData.description,
                startdate: new Date(leaveData.startdate).toLocaleDateString(),
                enddate: new Date(leaveData.enddate).toLocaleDateString(),
                days:(new Date(leaveData.enddate).getDate()-new Date(leaveData.startdate).getDate())+1,
                applydate:moment(leaveData.applydate).format('YYYY-MM-DD'),
                status:leaveData.status,
              })
           
              setLoading(false)
   
         }    
       catch(err){
           console.log("error",err)
       }
       }
       fetchDeptList()
   
     },[])

     const changeStatus= (id, status)=>{
        const data ={
            update:status
        }       
    

     fetch(`${base_URL}/api/leave/${id}`, {
         method:"PUT",
         body: JSON.stringify(data),
         headers: {

             "Authorization": `Bearer ${token}`,
             "Content-Type": 'application/json'
         }
     })
         .then((response) => {
            
             return response.json()
         })
         .then((data) => {
         
             navigate('/admindashboard/leave')
         })
         .catch((err) => {
             console.log("error", err)
         })


     }


    return (

        loading ? <div>Loading...</div> :
        <div className="employeeview-container">
            <h3 className='emp-profile'>Leave Detail</h3>
        <div className="employeeview">
            <div className="employeeview-image">
                <img src={leave.profileImage} alt="Image" className='empview-img'/>
            </div>
            <div className="employeeview-content">
            <p>Name: {leave.name}</p>
                <p>Employee ID: {leave.employeeId}</p>
                <p>Department: {leave.departmentId}</p>
                <p>Desgination: {leave.designation}</p>
                <p>Date of Birth: {new Date(leave.dob).toLocaleDateString()}</p>
                <p>Gender: {leave.gender}</p>
                <p>Reason: {leave.reason}</p>
                <p>Start Date: {leave.startdate}</p>
                <p>End Date: {leave.enddate}</p>
                <p>Days: {leave.days}</p>
                <p>Apply Date: {leave.applydate}</p>
                <div className="leave-status">
                    <p>
                    {leave.status === "Pending" ? "Action:" : "Status:"}

                    </p>
                    {leave.status==="Pending" ? 
                   ( <div className="leave-approve-reject">
                    <button className='leave-approve' onClick={()=>{
                        changeStatus(leave.leaveId, "Approve")

                    }} >Approve</button>
                    <button className='leave-reject' onClick={()=>{
                        changeStatus(leave.leaveId, "Reject")

                    }} >Reject</button>

                    </div>):
                    <p>{leave.status}</p>


                    }
                </div>
                
              
            </div>
                
        </div>
    
    </div>
      )
}

export default LeaveViewAdmin