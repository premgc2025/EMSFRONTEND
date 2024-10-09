
import React, { useContext, useState } from 'react'
import { createContext } from 'react'



 const authContext = createContext()

function TheContext({children}) {
  let data = localStorage.getItem("allData")
  
    data = data ? JSON.parse(data) : {};


   const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")))
   const [allFile, setAllFile] = useState({})

    const[userName,setUserName]=useState(data.name)
    const[role,setRole]=useState(data.role)
    const[loginId, setLoginId] = useState(data.id)


    function loginUser(loginName){
        setUserName(loginName)
    }
  
    function logout(){
        
        // localStorage.removeItem("token")
        // localStorage.removeItem("allData")
        localStorage.clear()
        setToken(null)
        setAllFile({})
      }
  return (
    <authContext.Provider value={{userName,setUserName,token,setToken, loginUser, logout, role,setRole, loginId, setLoginId, setAllFile}}>
    
  

        {children}

    </authContext.Provider>
    
  )
}

export const userData = ()=>useContext(authContext)
export default TheContext