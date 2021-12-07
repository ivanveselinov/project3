

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
            <h1>Welcome to profile: {appUser?.email}</h1>
            {lection.map(({userid, description , title, timestamp, user, id}) =>
            <div className="w-3/4 border-2 mt-10 m-auto" key={lection.id}>
                <div className="w-3/4 border mt-10 m-auto">
                
                <label>Created at: </label>
                 {timestamp?.toDate().toUTCString()}
                </div>

                <label>Title: </label>
                     {title}
                <div>
                    <label>Description: </label>
                    {description}
                </div>
                lection id {lection.id}

                <div>
               
                 <button onClick={() => handleDelete(id)}>X</button>
                </div>
            </div>
            )}
          
        </div>
    )
}

export default Profile
