
import React from 'react'
import { userData } from '../../context/TheContext'
import { useNavigate } from 'react-router-dom'

function AdminNavBar() {
  const navigate = useNavigate()
    const {userName,logout} = userData()
  
  return (
    <div className="adminnavbar-container">
        <div className="adminnavbar-section">
            <h3 className='adminnavbar-welcome'>Welcome {userName}</h3>
            <div className="adminnavbar-logout-btn">
                <button onClick={()=>{
                  logout()
                  navigate('/login')
                }}>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default AdminNavBar
