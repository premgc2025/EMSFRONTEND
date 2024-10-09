
import React from 'react'
import { userData } from '../context/TheContext'
import { Navigate } from 'react-router-dom'


function RoleBuilding({children, requiredRole}) {
  
const {userName,role,token}= userData()



  return (
    requiredRole===role ? children : <Navigate to = '/employeedashboard'/>
   
  )
}

export default RoleBuilding