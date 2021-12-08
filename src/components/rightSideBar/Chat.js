import React from 'react'
import {useState, useEffect} from 'react';
import { db } from '../firebase/Firebase';
import SendMessage from './SendMessage';
import Avatar from '@mui/material/Avatar';


function Chat() {

    const [messages, setMessages] = useState([]);

  useEffect(() => {
    db.collection('messages').orderBy('createAt').limit(150).onSnapshot(snapshot =>{
        setMessages(snapshot.docs.map(doc => doc.data()))
        console.log(snapshot.docs)
       
    })
   
   
  }, [])
 

    return (
        <div className="w-1/2 m-auto max-h-10 ">  
        
            
           {messages.map(({id, text,createAt, displayName}) =>
            <div key={id}>
            
              <div className="flex items-center space-x-2 border-t ">
              <p>{displayName}</p>
              <p>{new Date(createAt?.toDate()).toLocaleString()}</p>

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

export default Chat
