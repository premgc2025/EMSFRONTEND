
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import base_URL from '../../helper.js'
import { userData } from '../../context/TheContext.jsx'



function ResetPassword() {
    const {token,loginId} = userData()
 

    const navigate = useNavigate()
    const [message,setMessage] = useState({})

    const [user,setUser]= useState({
        oldpassword:"",
        newpassword:"",
        confirmpassword:""
    })

    function loginInput(e){
        setUser((preValue)=>{
            return( {...preValue,[e.target.name]:e.target.value})
        })
    }

    function submitReset(e){
        e.preventDefault()
        const {newpassword, confirmpassword} = user
        if(newpassword!==confirmpassword)
        {
            alert("Password and Confirm Password Field do not match !! ")
        }
        else{ 

        fetch(`${base_URL}/api/resetpassword/${loginId}`,{
            method:"PUT",
            body:JSON.stringify(user),
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        })
        .then((response)=>{
         
            return response.json()
        })
        .then((data)=>{
        
            if(data.success){
                   
                    navigate('/employeedashboard')
            }
            else{
               
                setMessage(data)
                setTimeout(() => {
                    setMessage({})
                }, 5000);
            }
        })
        .catch((err)=>{
            console.log("error",err)
        })
    }

    }
    return (
        <div className="register-container reset-password">
            <form action="" className='register-form' onSubmit={submitReset}>
                <h1>Reset Password</h1>
                <p className={`${message.success}`}>{message.error}</p>
               
                <div className="form-inp">
                    <label htmlFor="oldpasswordid">Old Password</label>
                    <input className='inp' type="password" id="oldpasswordid" name="oldpassword" placeholder='Enter Old Password' onChange={loginInput} value={user.oldpassword} required/>
                </div>
                <div className="form-inp">
                    <label htmlFor="newpasswordId">New Password</label>
                    <input className='inp' type="password" id="newpasswordId" name="newpassword" placeholder='Enter new Password' onChange={loginInput} value={user.newpassword} required/>
                </div>
                <div className="form-inp">
                    <label htmlFor="confirmpasswordId">Confirm Password</label>
                    <input className='inp' type="password" id="confirmpasswordId" name="confirmpassword" placeholder='Enter confirm Password' onChange={loginInput} value={user.confirmpassword} required/>
                </div>
              
                <div className="form-inp">
                    <button className='register-form-btn'>Reset Password</button>
                </div>
              
            </form>
        </div>
      )
}

export default ResetPassword