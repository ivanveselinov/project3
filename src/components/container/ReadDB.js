
import React from 'react'
import { useContextProvider } from '../../context/StateProvider'



// connect db from container and read from database!!! simple code
export default function ReadDB({title, description, timestamp, user, handleDelete, lecture}) {
    const [{appUser}, dispatch] = useContextProvider()
    // console.log("i am lecture id", lecture.id)
    return (
        
    <div className="m-auto border w-3/4 mt-20 h-40"> 
       <p>Teacher: {user}</p>
       <p>createAt: {timestamp?.toDate().toUTCString()}</p>
       <p>Title: {title}</p>
       <p>Description: {description}</p>
       <button onClick={() => handleDelete(lecture.id)}>X</button>
    </div>
    )
}
