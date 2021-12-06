import React from 'react'



// connect db from container and read from database!!! simple code
export default function ReadDB({title, description, timestamp, user}) {
  
 
    return (
        
    <div className="m-auto border w-3/4 mt-20 h-40"> 
       <p>email: {user}</p>
       <p>createAt: {timestamp}</p>
       <p>Ttile: {title}</p>
       <p>Description: {description}</p>

    </div>
    )
}
