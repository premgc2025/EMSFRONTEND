import React, { useState } from 'react'
import base_URL from '../../helper'
import { userData } from '../../context/TheContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function AddSalary() {
    const { token } = userData()
    const navigate = useNavigate()


    const [deptData, setDeptData] = useState([])
    const [employeeId, setEmployeeId] = useState([])
    const [salaryData, setSalaryData] = useState({})



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
    // Get Employee ID by Department 
    useEffect(() => {
        const employeeList = async () => {
            const id = salaryData.departmentId

            try {
                const resData = await fetch(`${base_URL}/api/employeeid/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })

                const getDeptData = await resData.json()
              

                if (getDeptData.success) {
                    setEmployeeId(getDeptData.getEmployee)

                }
            }
            catch (err) {
                console.log("error", err)
            }
        }

        employeeList()
    }, [salaryData.departmentId])



    function inputData(e) {
        const { name, value } = e.target

        setSalaryData((preValue) => {
            return { ...preValue, [name]: value }
        })
    }


    function submitForm(event) {
        event.preventDefault()


        fetch(`${base_URL}/api/salary`, {
            method: "POST",
            body: JSON.stringify(salaryData),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => {
             
                return response.json()
            })
            .then((data) => {
            
                navigate('/admindashboard/salarylist')
            })
            .catch((err) => {
                console.log("error", err)
            })
    }

    return (
        <div className="Employee-container">
            <form className='employee-form' onSubmit={submitForm} >
                <h1>Salary Details</h1>

                <div className="form-section">

                    <div className="form-emp-inp">
                        <label htmlFor="deptId">Deparment</label>
                        <select id="deptId" className='inp' name='departmentId' onChange={inputData} >

                            <option value="">Select Deparment</option>
                            {deptData.map((dep) => {
                                return <option key={dep._id} value={dep._id}>{dep.dept_name} </option>
                            })}

                        </select>

                    </div>
                    <div className="form-emp-inp">
                        <label htmlFor="empId">Employee ID</label>
                        <select id="empId" className='inp' name='employeeId' onChange={inputData} >

                            <option value="">Select Employee ID</option>
                            {employeeId.map((emp) => {
                                return <option key={emp._id} value={emp._id}>{emp.employeeId} </option>
                            })}

                        </select>


                    </div>
                </div>


                <div className="form-section">
                    <div className="form-emp-inp">
                        <label htmlFor="salaryId">Basic Salary</label>
                        <input className='inp' type="number" id="salaryId" name="basicsalary" placeholder='Enter Your Basic Salary' onChange={inputData} value={salaryData.basicsalary} required />
                    </div>
                    <div className="form-emp-inp">
                        <label htmlFor="allowancesId">Allowances</label>
                        <input className='inp' type="number" id="allowancesId" name="allowance" placeholder='Enter Your Allowances' onChange={inputData} value={salaryData.allowance} required />
                    </div>

                </div>
                <div className="form-section">
                    <div className="form-emp-inp">
                        <label htmlFor="deductionId">Deduction</label>
                        <input className='inp' type="number" id="deductionId" name="deduction" placeholder='Enter Your Deduction' onChange={inputData} value={salaryData.deduction} required />
                    </div>
                    <div className="form-emp-inp">
                        <label htmlFor="dobtId">Pay Date</label>
                        <input className='inp' type="date" id="dobId" name="paydate" placeholder='Enter Your Pay Date' onChange={inputData} value={salaryData.paydate} required />
                    </div>
                </div>

                <div className="form-emp-inp">
                    <button className='register-form-btn'>Submit</button>
                </div>



            </form>
        </div>
    )
}


export default AddSalary