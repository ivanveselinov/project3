import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/Firebase';
import ReadDB from '../container/ReadDB'
export const Connection = () => {

    const [lection, setLection] = useState([]);
                         //Delete 
    const handleDelete = (lectionId) => {  
        const newLection = [...lection];
        const index = lection.findIndex((lection) => lection.id === lectionId);
        newLection.splice(index, 1);

        setLection(newLection);

        db.collection("lection").doc(lectionId).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            // console.error("Error removing document: ", error);
        });
    }

    // everysingle time the new post is added this code fire
    useEffect(() => {  // RealTime connection to database
        db.collection('lection').orderBy('timestamp', "desc").limit(150).onSnapshot(snapshot =>{
            setLection(snapshot.docs.map(doc =>({
                id: doc.id ,
                data: doc.data()
            })))
            // console.log('I am reading from db',snapshot.docs)
        })
       
       
      }, [])
     

    return (
        
        <div>
               {/* Lecture read from database! */}
               {lection.map((post) => (
               <ReadDB
               key={post.id}
               lecture={post}
               title={post.data.title}
               description={post.data.description}
               timestamp={post.data.timestamp}
               user={post.data.user}
               handleDelete={handleDelete}
                />
            

               ))}

        </div>
    )
}
