import React, { useRef, useState } from 'react'
import ReadDB from './ReadDB'
import { useContextProvider } from '../../context/StateProvider'
import {db, storage} from '../../firebase/Firebase'
import firebase from 'firebase'
//mui
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { Connection } from './Connection'

function Input() {
    const [{appUser}, dispatch] = useContextProvider();
    const titleRef = useRef(null); // defining refs for input
    const descriptionRef = useRef(null); // defining refs for input
    const fileRef = useRef(null); // defining refs for input
    const [postImage, setPostImage] = useState(); //state for storing the image before uploading to db
    const [loading, setLoading] = useState(false); //state for preventing user to post same lection couple of times
   //to remove the picture from the feedinput if the user uploaded a wrong image
  const removeImage = () => {
    setPostImage(null);
  };

  //Handle image uploading !!
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]); ///remember this code for uploadng the file
      console.log(e.target.value)
    }

    reader.onload = (readerEvent) => {
      setPostImage(readerEvent.target.result);
    };
  };

    const submitHandler = (e) => {
        e.preventDefault();
        if (loading === true ) return;  //if someone click more times at once //if function is running do not run it again
        setLoading(true);

        

        db.collection("lection")
        .add({
            user: appUser?.email,
            userid: appUser.uid,
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(), 
        })
        .then((doc) => {
            //we uploading the image seperately ////
            //IMAGE!!
            if (postImage) {
              const uploadTask = storage
                .ref(`lection/${doc.id}`)
                .putString(postImage, "data_url");
    
              removeImage(); //removing image after uploading
              //uploading the image
              uploadTask.on(
                "state_change",
                null,
                (error) => console.log(error),
                () => {
                  storage
                    .ref("lection")
                    .child(doc.id)
                    .getDownloadURL() //gettig the uploaded image url
                    .then((url) => {
                      db.collection("lection").doc(doc.id).set(
                        //adding the url to the lection's doc
                        {
                          postImage: url,
                        },
                        { merge: true }
                      );
                    });
                }
              );
            }
          });
            // reseting the inputs and the states
            
            titleRef.current.value = '';
            descriptionRef.current.value = '';
            setLoading(false);
     
    }

    return (
        <div className="w-1/2 border ">

           <div className="w-3/4 border mt-10 m-auto">
           <form onSubmit={submitHandler}> 
               <div className="p-2 text-xl">
                    <label>Teacher: {appUser?.email} </label>
                </div>
               <div className=" border p-2 ">
                <div>
                    <label>Title: </label>
                    <input type="text" className="rounded-xl bg-gray-200 p-1" name="title" ref={titleRef}></input>
               </div>
               <div className="mt-2">
                    <label>Description: </label>
                    <input type="text" className="rounded-xl p-1 bg-gray-200" name="description" ref={descriptionRef}></input>
               </div>
               <div>
               {postImage && (
            <div
              onClick={removeImage}
              className="flex flex-col filter hover:brightness-90 transition duration-150 transform hover:scale-95 cursor-pointer"
            >
              <img
                loading="lazy"
                src={postImage}
                alt="postImage"
                className="h-9 object-contain "
              />
            </div>
          )}
        </div>

        <div className="flex justify-between lg:w-full pt-3 border-t mt-4 space-x-4">
          {/* Photo button */}
           <input type="file"  ref={fileRef} onChange={addImageToPost} />
               </div>
               </div>
               <Button variant="contained" type="submit"endIcon={<SendIcon />}>Send</Button>
           
           </form>
           </div>
           <Connection/> 
            
        </div>
    )
}

export default Input
