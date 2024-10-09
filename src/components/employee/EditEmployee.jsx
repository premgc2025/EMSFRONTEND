
import React, { useState } from 'react'
import base_URL from '../../helper'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { userData } from '../../context/TheContext'




function EditEmp() {
    const { id } = useParams()
  
    const { token } = userData()
    const [employee, setEmployee] = useState({})
    const [loading, setLoading] = useState(false)
    const [empData, setEmpData] = useState({})
    const [newDept, setNewDept] = useState([])
   


    useEffect(() => {
        const fetchDeptList = async () => {
            setLoading(true)

            try {
              
                const resData = await fetch(`${base_URL}/api/employee/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
             

                const getData = await resData.json()               

                setEmployee({

                    name: getData.getEmployee.userId.name,
                    departmentId: getData.getEmployee.departmentId._id,           
                    designation: getData.getEmployee.designation,
                    employeeId: getData.getEmployee.employeeId,
                    gender: getData.getEmployee.gender,
                    salary: getData.getEmployee.salary,


                })

                setLoading(false)

            }
            catch (err) {
                console.log("error", err)
            }
        }
        fetchDeptList()

    }, [])


    //  On Chnage Input
    function inputData(e) {
        const { name,  value } = e.target
            setEmployee((preValue) => {
                return { ...preValue, [e.target.name]: e.target.value }
            })
        
    }

    // Submit Update

    function submitForm(event) {
        event.preventDefault()


        fetch(`${base_URL}/api/employee/${id}`, {
            method:"PUT",
            body: JSON.stringify(employee),
            headers: {

                "Authorization": `Bearer ${token}`,
                "Content-Type": 'application/json'
            }
        })
            .then((response) => {
           
                return response.json()
            })
            .then((data) => {
                console.log("data after res ", data)
            })
            .catch((err) => {
                console.log("error", err)
            })
    }

    // Get Deparment Data
    useEffect(() => {
        const fetchDeptList = async () => {

            try {
                const resData = await fetch(`${base_URL}/api/department`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })

                const getDeptData = await resData.json()

                if (getDeptData.success) {
                    setNewDept(getDeptData.department)

                }
            }
            catch (err) {
                console.log("error", err)
            }
        }

        fetchDeptList()
    }, [])


    return (
        <div className="Employee-container">
            <form className='employee-form' onSubmit={submitForm} >
                <h1>Employee Profile</h1>
                <div className="form-section">
                    <div className="form-emp-inp">
                        <label htmlFor="nameId">Name</label>
                        <input className='inp' type="text" id="nameId" name="name" placeholder='Enter Your name' onChange={inputData} defaultValue={employee.name} required />
                    </div>

                    <div className="form-emp-inp">
                        <label htmlFor="deptId">Deparment</label>
                        <select id="deptId" className='inp' name='departmentId' onChange={inputData} >

                            <option value="">Select Deparment</option>
                            {newDept.map((dep) => {
                                return <option key={dep._id} value={dep._id}>{dep.dept_name} </option>
                            })}
                        </select>

                    </div>
                </div>


                <div className="form-section">
                    <div className="form-emp-inp">
                        <label htmlFor="empId">Employee ID</label>
                        <input className='inp' type="text" id="empId" name="employeeId" placeholder='Enter Your Employe ID' onChange={inputData} defaultValue={employee.employeeId} required />
                    </div>
                    <div className="form-emp-inp">
                        <label htmlFor="genderId">Gender</label>
                        <select name="gender" className='inp' id="genderId" onChange={inputData} defaultValue={employee.gender} required>
                            <option value="select">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                   
                </div>
              

                <div className="form-section">
                    <div className="form-emp-inp">
                        <label htmlFor="designationId">Designation</label>
                        <input className='inp' type="text" id="designationId" name="designation" placeholder='Enter Your Degination' onChange={inputData} defaultValue={employee.designation} required />
                    </div>
                    <div className="form-emp-inp">
                        <label htmlFor="salaryId">Salary</label>
                        <input className='inp' type="number" id="salaryId" name="salary" placeholder='Enter Your Salary' onChange={inputData} defaultValue={employee.salary} required />
                    </div>
                </div>
             
                  

                



                <div className="form-emp-inp">
                    <button className='register-form-btn'>Submit</button>
                </div>



            </form>
        </div>
    )
}


export default EditEmp