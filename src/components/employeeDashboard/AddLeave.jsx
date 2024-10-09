

import React, { useState } from 'react'
import { userData } from '../../context/TheContext'
import base_URL from '../../helper'
import { useNavigate } from 'react-router-dom'

function AddLeave() {
    const navigate = useNavigate()
    const {loginId, token} = userData()
    const[leaveData, setLeaveData] = useState({
        userId:loginId
    })
  

    function inputData(e) {
        const { name, value } = e.target

        setLeaveData((preValue) => {
            return { ...preValue, [name]: value }
        })
    }

    function submitForm(event) {
        event.preventDefault()


        fetch(`${base_URL}/api/leave`, {
            method: "POST",
            body: JSON.stringify(leaveData),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => {
               
                return response.json()
            })
            .then((data) => {
            
                navigate(`/employeedashboard/leave/${loginId}`)
            })
            .catch((err) => {
                console.log("error", err)
            })
    }




    return (
        <div className="Employee-container">
            <form className='employee-form' onSubmit={submitForm}>
                <h1>Request for Leave</h1>

                <div className="form-section">
                    <div className="form-emp-inp leavetype">
                        <label htmlFor="leaveId">Leave Type</label>
                        <select className='inp '  name="typeofleave" id="leaveId" onChange={inputData}>
                            <option value="default">Select Leave</option>
                            <option value="Annual">Annual</option>
                            <option value="Sick">Sick</option>
                            <option value="Casual">Casual</option>
                        </select>
                        
                    </div>
                   

                </div>
                <div className="form-section">
                <div className="form-emp-inp">
                        <label htmlFor="startdateId">Start Date</label>
                        <input className='inp' type="date" id="startdateId" name="startdate" placeholder='Enter Start Date' onChange={inputData} value={leaveData.startdate} required />
                    </div>
                <div className="form-emp-inp">
                        <label htmlFor="enddateId">End Date</label>
                        <input className='leavetype' type="date" id="enddateId" name="enddate" placeholder='Enter End Date' onChange={inputData} value={leaveData.enddate} required />
                    </div>
                    
                </div>
                <div className="form-section">
                
                <div className="form-emp-inp leavetype">
                        <label htmlFor="desId">Description</label>
                        <textarea className='Leave-Description' rows="5"  id="desId" name="description" placeholder='Enter Description' onChange={inputData} value={leaveData.description} required />
                    </div>
                    
                </div>

                <div className="form-emp-inp">
                    <button className='register-form-btn'>Submit</button>
                </div>



            </form>
        </div>
    )
}

export default AddLeave