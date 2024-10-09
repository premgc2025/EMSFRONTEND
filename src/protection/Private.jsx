
import React from 'react'
import { userData } from '../context/TheContext'
import { Navigate } from 'react-router-dom'

function Private({children}) {
    const {token} = userData()
   
  return (
    token ? children : <Navigate to = '/login'/>
  )
}

export default Private;