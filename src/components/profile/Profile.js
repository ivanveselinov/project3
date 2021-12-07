

import React, { useEffect, useState } from 'react'
import { useContextProvider } from '../../context/StateProvider'
import { db } from '../../firebase/Firebase';
import { Connection } from '../container/Connection';

function Profile() {
    const [lection, setLection] = useState([]);
    const [{appUser}, dispatch] = useContextProvider();
   
                //Delete from db
    const handleDelete = (lectionId) => {   //Delete 
        const ThisUserId = appUser.uid
        const newLection = [...lection];
        const index = lection.findIndex((lection) => lection.id === lectionId);
        newLection.splice(index, 1);

        setLection(newLection);
        console.log('i am lection', lection.id)
        db.collection("lection").doc(lectionId).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
    
                 // RENDER FILES FOR SPECIFIC USER!!
        useEffect(() => {  // RealTime connection to database
            const thisUserId = appUser.uid
            // console.log(thisUserId)
            // console.log('component did mount')
            // console.log('i am user',appUser)
            if(thisUserId ) {
                console.log("is statement is working",appUser)
            db.collection("lection").where("userid", "==", thisUserId)
            .get()
               .then((querySnapshot) => {
                   let result=[]; 
               
                   querySnapshot.forEach((doc) => {
                    const newLecture = doc.data();
                        // doc.data() is never undefined for query doc snapshots
                         result.push(newLecture);
                        //    console.log("hello")
             
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
            <h1>Welcome to profile: {appUser?.email}</h1>
            {/* <Connection/> */}
            {/* {userid, description , title, timestamp, user} */}
            {lection.map((thisLection) =>
            <div className="w-3/4 border-2 mt-10 m-auto" key={thisLection.id}>
                <div className="w-3/4 border mt-10 m-auto">
                
                <label>Created at: </label>
                 {thisLection.timestamp?.toDate().toUTCString()}
                </div>

                <label>Title: </label>
                     {thisLection.title}
                <div>
                    <label>Description: </label>
                    {thisLection.description}
                </div>

                <div>
               
                 <button onClick={() => handleDelete(thisLection.id)}>X</button>
                </div>
            </div>
            )}
          
        </div>
    )
}

export default Profile
