
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import base_URL from '../helper.js'
import { userData } from '../context/TheContext.jsx'


function Login() {
    const {loginUser,setToken,setLoginId, loginId, setAllFile,setRole} = userData()
      

    const navigate = useNavigate()
    const [message,setMessage] = useState({})

    const [user,setUser]= useState({})

    function loginInput(e){
        setUser((preValue)=>{
            return( {...preValue,[e.target.name]:e.target.value})
        })
    }

    function loginHandle(e){
        e.preventDefault()

     

        fetch(`${base_URL}/api/login`,{
            method:"POST",
            body:JSON.stringify(user),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((response)=>{
           
            return response.json()
        })
        .then((data)=>{
        
            if(data.success){              
                loginUser(data.name)
                setToken(data.token)
                setLoginId(data.id)
                setRole(data.role)              
              
               
              localStorage.setItem("token",JSON.stringify(data.token))
              localStorage.setItem("allData",JSON.stringify(data))
          
      
                
                if(data.role==="admin")
                {
                  
                    navigate('/admindashboard')
                }
                else{
                   
                    navigate('/employeedashboard')

                }
                
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
  return (
    <div className="register-container">
        <form action="" className='register-form' onSubmit={loginHandle}>
            <h1>Login</h1>
            <p className={`${message.success}`}>{message.error}</p>
           
            <div className="form-inp">
                <label htmlFor="emaild">Email</label>
                <input className='inp' type="text" id="emailId" name="email" placeholder='Enter Your email' onChange={loginInput} value={user.email} required/>
            </div>
            <div className="form-inp">
                <label htmlFor="passwordId">Password</label>
                <input className='inp' type="password" id="passwordId" name="password" placeholder='Enter Your Password' onChange={loginInput} value={user.password} required/>
            </div>
          
            <div className="form-inp">
                <button className='register-form-btn'>Join</button>
            </div>
            <p>Hove no account? <Link to="/register">Register </Link> </p>
        </form>
    </div>
  )
}

export default Login