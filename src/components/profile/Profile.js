

import React, { useEffect, useState } from 'react'
import { useContextProvider } from '../../context/StateProvider'
import { db } from '../../firebase/Firebase';
import { Connection } from '../container/Connection';
//mui
import FileDownloadIcon from '@mui/icons-material/FileDownload';

function Profile({lecture}) {
    const [lection, setLection] = useState([]);
    const [{appUser}, dispatch] = useContextProvider();
   
                //Delete from db
    const handleDelete = (lectionId) => {   //Delete 
        const newLection = [...lection];
        const index = lection.findIndex((lection) => lection.id === lectionId);
        newLection.splice(index, 1);

        setLection(newLection);
        console.log('i am lection', lectionId)
        db.collection("lection").doc(lectionId).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
                 // RENDER FILES FOR SPECIFIC USER!!
        useEffect(() => {  // RealTime connection to database
            const thisUserId = appUser.uid

            if(thisUserId ) {
                console.log("is statement is working",appUser)
            db.collection("lection").where("userid", "==", thisUserId)
            .get()
               .then((querySnapshot) => {
                   let result=[]; 
               
                   querySnapshot.forEach((doc) => {
                    //    console.log('37-38', doc.id);
                    const newLecture = doc.data(); //passing id so we can remove user item
                    newLecture.id = doc.id;        //passing id so we can remove user item
                         result.push(newLecture);
             
       });
       setLection([...result])
       console.log(result)
   })
   .catch((error) => {
       console.log("Error getting documents: ", error);
       
   });
}     // test.firestore.js
           
          }, [appUser])

    return (

<div className="w-full">
        {lection.map(({userid, description , title, timestamp, user, id, postImage, category}) =>
    <div className="sm: w-full sm: text-xs  lg:text-xl lg:w-3/4  m-auto border  mt-20 rounded-2xl p-2 bg-white shadow-xl"> 
        <div className="text-center p-1 w-full ">
             <p className="text-red-500 break-words">Teacher: {user} </p>
             <p>{timestamp?.toDate().toUTCString()}</p>
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
       <button className="bg-blue-300 rounded-md p-1 mb-2" onClick={() => handleDelete(id)}>Remove Post</button>
    </div>
    <div>
    </div>
</div>
        )}
      
    </div>
    )
}

export default Profile




