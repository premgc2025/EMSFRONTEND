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
		name: 'Employee ID',
		selector: row => row.employeeId,
        sortable: true,
		width:'9rem'		  
       
	},
	{
		name: 'Leave',
		selector: row => row.typeofleave,       
		width:'9rem'		  
       
	},
	{
		name: 'From',
		selector: row => row.startdate,        
		width:"9rem"
       
	},
	{
		name: 'To',
		selector: row => row.enddate,       
		width:"9rem"
       
	},
	{
		name: 'Days',
		selector: row => row.days,       
		width:'5rem'		  
       
	},
	{
		name: 'Apply Date',
		selector: row => row.applydate,       
		width:"9rem"
       
	},
	{
		name: 'Status',
		selector: row => row.status,
		
	},
	{
		name: 'Action',
		selector: row => row.action,
		
	},
];

const ActionButton = (id)=>{


	return(
		<div>
			<div className="action-view">
		        
         <Link to={`/admindashboard/leaveviewadmin/${id.leaveId}`}><button className="dept-edit-btn" >View</button> </Link> 
     
			</div>
		</div>
	)
}


export {columns, ActionButton}