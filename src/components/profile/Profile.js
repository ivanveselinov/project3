

import React, { useEffect, useState } from 'react'
import { useContextProvider } from '../../context/StateProvider'
import { db } from '../../firebase/Firebase';
import { Connection } from '../container/Connection';

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
            {lection.map(({userid, description , title, timestamp, user, id, postImage}) =>
           <div className="m-auto border w-1/2 mt-20 rounded-2xl p-2"> 
<div className="border w-full ">
<p>Teacher: {user} </p>
<p>createAt: {timestamp?.toDate().toUTCString()}</p>
</div>
<div className="border w-fulll mt-2">
   <p>Title: {title}</p>
   <p>Description: {description}</p>
</div>

<div className="border w-full mt-2 flex justify-between ">
    <a  href={postImage} target="_blank"> 
    <p>Get your pdf!! </p> 
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
