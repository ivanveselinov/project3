import React from 'react'
import {useState, useEffect} from 'react';
import { db } from '../../firebase/Firebase';
import Avatar from '@mui/material/Avatar';
import SendMessage from './SendMessage';
import ReactScrollableFeed from 'react-scrollable-feed'

function RightSideBar() {
  const [messages, setMessages] = useState([]);


  useEffect(() => {  // .limit(150) i put unlimited messages
    db.collection('messages').orderBy('createAt').onSnapshot(snapshot =>{
      const messages=snapshot.docs.map(doc => doc.data())
      setMessages(snapshot.docs.map(doc => doc.data()))
        console.log(snapshot.docs)
         console.log("i am chat", messages)
    })
   
   
  }, [])

  return (
    <div className="sm: w-1/2 lg:w-1/4 inline-block shadow-2xl lg:bg-white p-2  ">
      <div className='sm: w-full lg:w-full border rounded-xl shadow-xl p-2 h-30 overflow-scroll scrollbar-hide h-278 bg-gray-100 mt-10 m-auto'>
       <ReactScrollableFeed>
        {messages.map(({id, uid, text, createAt, email}) =>
          <div key={id}>
            
            <div className=" border sm:block  break-words lg:flex items-center space-x-2 border-t ">
                <div className='' >
                    <Avatar img alt=""/>
                </div>
                
              <div className="p-1">
                <div className="">
                  <div className=''>
                     <p className='sm: text-xs lg:text-xl '>{email}</p>
                     <p className='sm: text-xs lg:text-xl'>{new Date(createAt?.toDate()).toLocaleString()}</p>
                  </div>
                </div>
              </div>

            </div>
              <div >
                <p className="sm: text-xs lg:text-xl  bg-blue-200 p-1 rounded-tr-2xl rounded-bl-2xl mt-2 mb-2  focus:outline-none flex-grow text-left shadow-md break-words ">{text} </p>
              </div> 
       
          </div>
          )}

          <div className='mb-5'>
            <SendMessage />
          </div>
          
       </ReactScrollableFeed>
      </div>
    
    </div>
  )
}

export default RightSideBar


