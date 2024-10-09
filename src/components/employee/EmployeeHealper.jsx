import React, { useState } from "react"
import { FaEdit } from "react-icons/fa";
import { FaMoneyBill1Wave, FaTrashCan, FaUsersViewfinder } from "react-icons/fa6";
import base_URL from "../../helper";
import { userData } from "../../context/TheContext";
import { useNavigate,Link } from "react-router-dom";
import { BiBorderRadius } from "react-icons/bi";



const columns = [
	{
		name: 'S No',
		selector: row => row.sno,
		width:"4rem"
	},
	{
		name: 'Name',
		selector: row => row.name,
        sortable: true,
		width:"7rem"
       
	},
	
	{
		name: 'Image',
		selector: row => row.profileImage,
		width:'9rem'
			

      
       
	},
	{
		name: 'Department',
		selector: row => row.departmentId,
        sortable: true,
		width:"9rem"
       
	},
	{
		name: 'DOB',
		selector: row => row.dob,
        sortable: true,
		width:"6rem"
       
	},
	{
		name: 'Action',
		selector: row => row.action,
		
	},
];




    const ActionButton = ({id})=>{
        const navigate = useNavigate()
  
        const {token}=userData()
      
    return(
        <div className="emp-action">


        <div>          
         <Link to={`/admindashboard/viewemployee/${id}`}><button className="dept-edit-btn" >View</button> </Link> 
          
        </div>

        <div>          
         <Link to={`/admindashboard/editemployee/${id}`}><button className="dept-edit-btn" >Edit</button> </Link> 
        
        </div>
        <div>          
         <Link to={`/admindashboard/salarylist/${id}`}><button className="dept-edit-btn" >Salary</button> </Link> 
        
        </div>

        <div>          
         <Link to={`/admindashboard/leave/${id}`}><button className="dept-edit-btn" >Leave</button> </Link> 
       
        </div>

        </div>
    )
}

let department;

const getDeptList=async()=>{


	try{
	  const resData= await fetch(`${base_URL}/api/department`,{
		method:"GET",      
		headers:{
			"Content-Type":"application/json",
			"Authorization":`Bearer ${token}`
		}
	})
  
	  const getDeptData = await resData.json()

		
		department= getDeptData.department
		return department;
		
	  	}    
  catch(err){
	  console.log("error",err)
  }


  }


	


export {columns, ActionButton, getDeptList}
