
import React from 'react'

function ReportCard({icon,text,number,iconclass}) {
  return (
    <div className={`reportcard `}>
        <div className={`reportcard-icon ${iconclass}`}>
        {icon}

        </div>
      
        <div className="reportcard-items">
            <h3>{text}</h3>
            <p>{number}</p>

        </div>

    </div>
  )
}

export default ReportCard