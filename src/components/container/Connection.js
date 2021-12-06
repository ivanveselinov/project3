import { Feed } from '@mui/icons-material';
import userEvent from '@testing-library/user-event';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/Firebase';
import ReadDB from '../container/ReadDB'

export const Connection = () => {

    const [lection, setLection] = useState([]);


    //everysingle time the new post is added this code fire
    useEffect(() => {  // RealTime connection to database
        db.collection('lection').orderBy('createAt').limit(150).onSnapshot(snapshot =>{
            setLection(snapshot.docs.map(doc => doc.data()))
            console.log('I am reading from db',snapshot.docs)
           
        })
       
       
      }, [])
     

    return (
        
        <div>
           
               {/* Lecture read from database! */}
               {lection.map((lection) => {
               <ReadDB
               key={lection.id}
               title={lection.data.title}
               description={lection.data.description}
               timestamp={lection.data.timestamp}
               userEmail={lection.data.email}
               />
           })}


        </div>
    )
}
