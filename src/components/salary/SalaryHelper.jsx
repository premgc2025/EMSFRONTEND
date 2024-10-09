import { useState } from "react"
import { userData } from "../../context/TheContext"
import base_URL from "../../helper"

const columns = [
	{
		name: 'S No',
		selector: row => row.sno,
		width:"4rem"
	},
	{
		name: 'Department',
		selector: row => row.departmentId,
        sortable: true,
		width:"9rem"
       
	},
	
	{
		name: 'Employe ID',
		selector: row => row.employeeId,
        sortable: true,
		width:'7rem'
       
	},
	{
		name: 'Basic Salary',
		selector: row => row.basicsalary,
        sortable: true,
		width:"9rem"
       
	},
	{
		name: 'Allowance',
		selector: row => row.allowance,
        sortable: true,
		width:"7rem"
       
	},
		{
		name: 'Deduction',
		selector: row => row.deduction,
        sortable: true,
		width:"7rem"
       
	},
	{
		name: 'Net Salary',
		selector: row => row.netsalary,
        sortable: true,
		width:"7rem"
       
	},
	{
		name: 'Pay Date',
		selector: row => row.paydate,
        sortable: true,
		width:"9rem"
       
	},
	
];


export {columns}