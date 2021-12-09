import React from 'react'
import { useContextProvider } from '../../context/StateProvider'

//mui
import FileDownloadIcon from '@mui/icons-material/FileDownload';


// connect db from container and read from database!!! simple code
export default function ReadDB({title, description, timestamp,createAt  , user, handleDelete, lecture, postImage, category}) {
    
    const [{appUser, teachers,admin }, dispatch] = useContextProvider();

    // console.log("i am lecture id", lecture.id)
    return (
        
    <div className="sm: w-full sm: text-xs  lg:text-xl lg:w-3/4  m-auto border  mt-20 rounded-2xl p-2 bg-white shadow-xl"> 
    <div className="text-center p-1 w-full ">
  
         <p className="text-red-500 break-words">Teacher: {user} </p>
        

         {/* <p>{timestamp?.toDate().toUTCString()}</p> */}
    
    <p>{new Date(timestamp?.toDate()).toLocaleString()}</p>
    </div>
    <div className="border-t w-full mt-2 ">
       <p className='sm:text-xl lg:text-2xl text-center p-2  font-bold'>{title}</p>
       <p className="break-words border rounded-md p-5 shadow-sm">{description}</p>
    </div>

    <div className="sm: text-sm lg:text-2xl mt-2 flex justify-between p-2  text-red-500">
        <p>Subject: {category} </p> 
        <a  href={postImage} target="_blank"> 
        <p ><FileDownloadIcon  sx ={{ fontSize: 40 }} /></p>
       </a>
    </div>
    <div className="border w-full mt-2"></div>

        <div>
            {/* I AM YOUR ID{appUser.uid} */}

                     {/* // ADMIN USER!!!!  */}
       { appUser.uid === admin && 
       <button className="bg-blue-300 rounded-md p-1 mt-2" onClick={() => handleDelete(lecture.id)}>Remove Class</button>
                      }  

       </div>

    </div>
    )
}
