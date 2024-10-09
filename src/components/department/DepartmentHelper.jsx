import React from "react"
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import base_URL from "../../helper";
import { userData } from "../../context/TheContext";
import { useNavigate,Link } from "react-router-dom";



const columns = [
	{
		name: 'S No',
		selector: row => row.sno,
	},
	{
		name: 'Department Name',
		selector: row => row.dept_name,
        sortable: true,
       
	},
	{
		name: 'Action',
		selector: row => row.action,
	},
];




    const ActionButton = ({id})=>{
        const navigate = useNavigate()
  
        const {token}=userData()
      
      
      
function deleteDept(e,id){

 
   
    e.preventDefault()
    const confirm = window.confirm("Do you want to Delete")
    if(confirm){
    fetch(`${base_URL}/api/department/${id}`,{
        method:"DELETE",        
        headers:{
            
            "Authorization":`Bearer ${token}`
        }
    })
    .then((response)=>{
      
       
        return response.json()
    })
    .then((data)=>{
        
        navigate(0)

        
       
    })
    .catch((err)=>{
        console.log("error",err)
    })

    }}
    return(
        <div>
          
         <Link to={`/admindashboard/departmentedit/${id}`}><button className="dept-edit-btn" ><FaEdit/></button> </Link> 
           <button className="dept-delete-btn" onClick={(e)=>{
                deleteDept(e,id)
            }}><FaTrashCan/> </button>
        </div>
    )
}


export {columns, ActionButton}
