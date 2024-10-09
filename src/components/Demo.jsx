
import React from 'react'
import { userData } from '../context/TheContext'


function Demo() {
  const {logout,userName}=userData()
   
  return (
    <>
     <div>Demo-User Name: {userName} </div>
     <p></p>
     <button onClick={logout}>Logout</button>
    
    </>
   
  )
}

export default Demo