import React, { useState } from 'react'
import {db, auth} from '../../firebase/Firebase'
import firebase from 'firebase'
import SendIcon from '@mui/icons-material/Send';
function SendMessage() {
    
    const [msg, setMsg] = useState('');
    
    async function sendMessage(e) {
        e.preventDefault();
        if( msg === "" ) return ;  //if msg is empty string do nothing!!
        const { uid,email } = firebase.auth().currentUser
            console.log('this is UID CHAT',uid);
        await db.collection('messages').add({
            text: 
            msg, 
            uid,    
            email,

            createAt: firebase.firestore.FieldValue.serverTimestamp()
        })
            setMsg("");
    }

    return (
      <div>
        <form onSubmit={sendMessage} > 
            <div className="flex space-x-2 justify-between " >
                
                <input 
                 className="form-textarea mt-1 block w-full border  rounded-full p-2"
                 placeholder="Message..." 
                 value={msg} 
                 onChange={(e) => setMsg(e.target.value)}
                 rows="3"
                 placeholder="Message..."
                /> 
             
                <button className="bg-transparent hidden hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded " >
                    Send<SendIcon/>
                </button>
            </div>
              
        </form>
      </div>
    )
}



     

  
export default SendMessage
