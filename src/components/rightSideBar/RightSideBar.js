import React from 'react'
import {useState, useEffect} from 'react';
import { db } from '../../firebase/Firebase';
import Avatar from '@mui/material/Avatar';
import SendMessage from './SendMessage';


function RightSideBar() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    db.collection('messages').orderBy('createAt').limit(50).onSnapshot(snapshot =>{
      const messages=snapshot.docs.map(doc => doc.data())
        setMessages(snapshot.docs.map(doc => doc.data()))
        console.log(snapshot.docs)
         console.log("i am chat", messages)
    })
   
   
  }, [])

  return (
    <div className="w-1/4 border p-2">
       {messages.map(({id, uid, text, createAt, email}) =>
            <div key={id}>
            
              <div className="flex items-center space-x-2 border-t ">
              <Avatar img alt=""  />
              <p>{uid}</p>
              <p>{email}</p>
              <p>{new Date(createAt?.toDate()).toLocaleString()}</p>
                {/* <p>{fromnow(new Date(createAt?.toDate()).toLocaleString(),
               { max: 1, }
              )}</p> */}

              </div>
              <div >
              <p className="bg-green-500 p-1 rounded-tr-2xl rounded-bl-2xl mt-2 mb-2 text-xl focus:outline-none flex-grow text-left shadow-md">{text} </p>
              </div> 
              
       
             </div>
           )}
             <SendMessage />

    </div>
  )
}

export default RightSideBar


