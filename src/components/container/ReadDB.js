
import React from 'react'
import { useContextProvider } from '../../context/StateProvider'



// connect db from container and read from database!!! simple code
export default function ReadDB({title, description, timestamp, user, handleDelete, lecture, postImage, category}) {
    const [{appUser}, dispatch] = useContextProvider()

    // console.log("i am lecture id", lecture.id)
    return (
        
    <div className="m-auto border w-3/4 mt-20 rounded-2xl p-2 bg-white shadow-xl"> 
    <div className="border w-full ">
    <p>Teacher: {user} </p>
    <p>createAt: {timestamp?.toDate().toUTCString()}</p>
    </div>
    <div className="border w-full mt-2">
       <p>Title: {title}</p>
       <p className="break-words">Description: {description}</p>
    </div>

    <div className="border mt-2 flex justify-between">
        <p>Subject: {category} </p> 
        <a  href={postImage} target="_blank"> 
        <p >Get your pdf!! </p>
       </a>
    </div>
    <div className="border w-full mt-2"></div>

        <div>
            {/* I AM YOUR ID{appUser.uid} */}

                     {/* // ADMIN USER!!!!  */}
       { appUser.uid === "gtDSj709LTbt4laOXeRE4hXBnP72" && 
       <button className="bg-blue-300 rounded-md p-1 mt-2" onClick={() => handleDelete(lecture.id)}>Remove Class</button>
                      }  

       </div>

    </div>
    )
}
