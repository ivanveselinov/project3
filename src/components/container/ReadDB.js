import React, { useEffect, useState } from 'react'
import { useContextProvider } from '../../context/StateProvider'
import { db } from '../../firebase/Firebase'
import firebase from 'firebase'
//mui
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Avatar from '@mui/material/Avatar';
//scroll auto
import ReactScrollableFeed from 'react-scrollable-feed'

// connect db from container and read from database!!! simple code
export default function ReadDB({title, description,lectionId, timestamp, createAt, user, handleDelete, lecture, postImage, category}) {
    
    const [{appUser, teachers, admin }, dispatch] = useContextProvider();
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    
    useEffect(() => {
        let unsubscribe;
         if (lectionId) {
            // console.log('i am lection id',lectionId);
            // console.log('i am comments ID', comments.id);
            // console.log('i am comments field', comments);
            unsubscribe = db
            .collection("lection") // database name!
            .doc(lectionId) //database id
            .collection("comments")//get inside comments 
            .orderBy('createAt')
            .onSnapshot((snapshot) => { //get snapshot of comments
                setComments(snapshot.docs.map((doc) => doc.data()));
                
            });
        }
        // console.log('this is unsubscribe',unsubscribe);
        
        return () => {
            unsubscribe();
        };
    }, [lectionId]);

    
    const postComment = (e) => {
        e.preventDefault();
        console.log('i am working')

        db.collection("lection").doc(lectionId).collection("comments").add({
            text: comment,
            username: appUser.email,
            id: appUser.uid,
            createAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setComment('');
    }     
    
    return (
        
    <div className="sm: w-full sm: text-xs  lg:text-xl lg:w-3/4  m-auto border  mt-20 rounded-2xl p-2 bg-white shadow-xl"> 
    <div className="text-center p-1 w-full ">
  
         <p className="text-red-500 break-words">Teacher: {user} </p>
    
    <p>{new Date(timestamp?.toDate()).toLocaleString()}</p>
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
    </div>

                    {/*  COMMENTS!!!!!!!! */}

    <div className=" w-full mt-2 p-1 shadow-xl">
    
        <div className='border rounded-sm shadow-sm overflow-y-auto max-h-80'>
        <ReactScrollableFeed>
         {comments.map((comment) => (  // map try each comment
            <p className='mt-2 p-2 border-b block break-words '>
                <b className='mr-5 mb-1 w-full flex '><Avatar/> {comment.username}</b>
                <b>{new Date(createAt?.toDate()).toLocaleString()}</b>
                <p className='mt-2 border-t'>{comment.text} </p>{/* show me comment and user who post it  */}
                
            </p>
            ))}
                     </ReactScrollableFeed>      
        </div>  
  
         <form className="border-t w-full mt-10 p-1 justify-between flex">
        
            <input
             className='w-3/4 h-10 border rounded-xl  p-2 mr-1' 
             type="text" placeholder='Add a comment...' 
             value={comment} 
             onChange={(e) => setComment(e.target.value)}
             />

            <button 
            className='w-1/4 h-10 border rounded-xl text-blue-400' 
            disabled={!comment} type="submit" 
            onClick={postComment}>Post</button>
        </form>

    </div>

        <div>
            {/* I AM YOUR ID{appUser.uid} */}

                     {/* // ADMIN USER!!!!  */}
       { appUser.uid === admin && 
       <button className="bg-blue-300 rounded-md p-1 mt-2" onClick={() => handleDelete(lecture.id)}>Remove Class</button>
                      }  

       </div>

    </div>
    )
}
