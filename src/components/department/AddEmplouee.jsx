
import React, { useState } from 'react'
import base_URL from '../../helper'
import { userData } from '../../context/TheContext'
import { useEffect } from 'react'

function AddEmployee() {
    const { token } = userData()
    const [empData, setEmpData] = useState({})  
    const [deptData, setDeptData] = useState([])
    console.log("onChange", empData)
   

    const newDept = deptData

    function inputData(e) {
        const { name, files, value } = e.target
        if (name === "file") {
            setEmpData((preValue) => {
                return { ...preValue, [e.target.name]: e.target.files[0] }
            })
        }
        else {
            setEmpData((preValue) => {
                return { ...preValue, [e.target.name]: e.target.value }
            })
        }
    }

    function submitForm(event) {
        event.preventDefault()

        const formDataObj = new FormData()
        Object.keys(empData).forEach((key) => {
            formDataObj.append(key, empData[key])
        })

         // Log FormData entries
    for (let [key, value] of formDataObj.entries()) {
        console.log(key, value);
    }
        console.log("token",token)

        fetch(`${base_URL}/api/employee`, {
            method: "POST",
            body:formDataObj,
            headers: {
                "Authorization": `Bearer ${token}`            }
        })

        .then(response => response.text())  // Change to text for debugging
.then(text => {
    console.log(text);  // Log the raw response
    try {
        const json = JSON.parse(text);
        // Handle the JSON data
    } catch (error) {
        console.error('Parsing error:', error);
    }
})
.catch(error => console.error('Fetch error:', error));
            // .then((response) => {
               
            //     return response.json()
            // })
            // .then((data) => {
            //     console.log("data after res ", JSON.parse(data))
            // })
            // .catch((err) => {
            //     console.log("error", err, err.message)
            // })
    }

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
                    setDeptData(getDeptData.department)

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
                        <input className='inp' type="text" id="nameId" name="name" placeholder='Enter Your name' onChange={inputData} value={empData.name} required />
                    </div>
                    <div className="form-emp-inp">
                        <label htmlFor="emaild">Email</label>
                        <input className='inp' type="text" id="emailId" name="email" placeholder='Enter Your email' onChange={inputData} value={empData.email} required />
                    </div>

                </div>

                <div className="form-section">
                    <div className="form-emp-inp">
                        <label htmlFor="passwordId">Password</label>
                        <input className='inp' type="password" id="passwordId" name="password" placeholder='Enter Your Password' onChange={inputData} value={empData.password} required />
                    </div>
                    <div className="form-emp-inp">
                        <label htmlFor="roleId">Role</label>
                        <select name="role" id="roleId" onChange={inputData} value={empData.role}>
                            <option value="select">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>

                        </select>

                    </div>
                </div>

                <div className="form-section">
                    <div className="form-emp-inp">
                        <label htmlFor="ageId">Age</label>
                        <input className='inp' type="number" id="ageId" name="age" placeholder='Enter Your age' onChange={inputData} value={empData.age} required />
                    </div>
                    <div className="form-emp-inp">
                        <label htmlFor="deptId">Deparment</label>
                        <select id="deptId" className='inp' name='departmentId' onChange={inputData} >

                            <option value="">Select Deparment</option>
                            {newDept.map((dep) => {
                                return <option key={dep._id} value={dep._id}>{dep.dept_name} </option>
                            })

                            }


                        </select>

                    </div>
                </div>

                <div className="form-section">
                    <div className="form-emp-inp">
                        <label htmlFor="empId">Employee ID</label>
                        <input className='inp' type="text" id="empId" name="employeeId" placeholder='Enter Your Employe ID' onChange={inputData} value={empData.employeeid} required />
                    </div>
                    <div className="form-emp-inp">
                        <label htmlFor="dobtId">Date of Birth</label>
                        <input className='inp' type="date" id="dobId" name="dob" placeholder='Enter Your Date of Birth' onChange={inputData} value={empData.dob} required />
                    </div>
                </div>

                <div className="form-section">
                    <div className="form-emp-inp">
                        <label htmlFor="genderId">Gender</label>
                        <select name="gender" id="genderId" onChange={inputData} value={empData.gender} required>
                            <option value="select">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="form-emp-inp">
                        <label htmlFor="meritalId">Marital Satatus</label>
                        <select name="maritalstatus" id="maritalId" onChange={inputData} value={empData.maritalstatus} required>
                            <option value="select">Select Status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                        </select>

                    </div>
                </div>

                <div className="form-section">
                    <div className="form-emp-inp">
                        <label htmlFor="designationId">Designation</label>
                        <input className='inp' type="text" id="designationId" name="designation" placeholder='Enter Your Degination' onChange={inputData} value={empData.designation} required />
                    </div>
                    <div className="form-emp-inp">
                        <label htmlFor="salaryId">Salary</label>
                        <input className='inp' type="number" id="salaryId" name="salary" placeholder='Enter Your Salary' onChange={inputData} value={empData.salary} required />
                    </div>
                </div>

                <div className="form-section">
                    <div className="form-emp-inp">
                        <label htmlFor="imageId">Profile Image</label>
                        <input className='inp' type="file" id="imageId" name="file" accept="image/*" onChange={inputData} required />
                    </div>
                </div>



                <div className="form-emp-inp">
                    <button className='register-form-btn'>Submit</button>
                </div>



            </form>
        </div>
    )
}

export default AddEmployee;