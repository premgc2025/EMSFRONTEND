
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import base_URL from '../helper.js'

function Register() {
    const [userData, setUserData]= useState({})
  

    function inputData(e){

        setUserData((preValue)=>{
            return {...preValue,[e.target.name]:e.target.value}
        })

    }

    function submitForm(event){
        event.preventDefault()
       

        fetch(`${base_URL}/api/register`,{
            method:"POST",
            body:JSON.stringify(userData),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((response)=>{
            
            return response.json()
        })
        .then((data)=>{
            console.log("data after res ",data)
        })
        .catch((err)=>{
            console.log("error",err)
        })


    }
  return (
    <div className="register-container">
        <form action="" className='register-form' onSubmit={submitForm}>
            <h1>Register</h1>
            <div className="form-inp">
                <label htmlFor="nameId">Name</label>
                <input className='inp' type="text" id="nameId" name="name" placeholder='Enter Your name' onChange={inputData} value={userData.name} required/>
            </div>
            <div className="form-inp">
                <label htmlFor="emaild">Email</label>
                <input className='inp' type="text" id="emailId" name="email" placeholder='Enter Your email'  onChange={inputData} value={userData.email} required/>
            </div>
            <div className="form-inp">
                <label htmlFor="passwordId">Password</label>
                <input className='inp' type="password" id="passwordId" name="password" placeholder='Enter Your Password'  onChange={inputData} value={userData.password} required/>
            </div>
            <div className="form-inp">
                <label htmlFor="roleId">Role</label>
                <input className='inp' type="text" id="roleId" name="role" placeholder='Enter Role'  onChange={inputData} value={userData.role} required/>
            </div>
            <div className="form-inp">
                <label htmlFor="ageId">Age</label>
                <input className='inp' type="number" id="ageId" name="age" placeholder='Enter Your age'  onChange={inputData} value={userData.age} required/>
            </div>
            <div className="form-inp">
                <button className='register-form-btn'>Submit</button>
            </div>
            <p> Hove no account? <Link to="/login">Login </Link> </p>
        
          
        </form>
    </div>
  )
}

export default Register