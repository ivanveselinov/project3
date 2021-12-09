import React, { useRef, useState } from 'react'
import ReadDB from './ReadDB'
import { useContextProvider } from '../../context/StateProvider'
import {db, storage} from '../../firebase/Firebase'
import firebase from 'firebase'
//mui
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { Connection } from './Connection'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import UploadFileIcon from '@mui/icons-material/UploadFile';


function Input() {
    const [{appUser, admin, teachers}, dispatch] = useContextProvider();
    const titleRef = useRef(null); // defining refs for input
    const descriptionRef = useRef(null); // defining refs for input
    const [category, setCategory] = useState("default category"); // category 
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
        
        if(   // If empty dont post
        titleRef.current.value === "" 
        || descriptionRef.current.value === "" 
        || category === "defaultCategory" )
        return;
        

        db.collection("lection")
        .add({
            user: appUser?.email,
            userid: appUser.uid,
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            category: category, 
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
            setCategory("defaultCategory");
            setLoading(false);
     
    }

    return (
      // "sm:w-1/2  lg:w-1/2  h-screen overflow-y-auto scrolbar-hide""
        <div className="sm:w-1/2  lg:w-1/2  h-screen overflow-y-auto scrollbar-hide"> {/* MAIN CONTAINER */}
            { (appUser.uid === admin || appUser.uid === teachers )  &&
           <div className="sm: w-full sm: text-xs border lg:text-xl lg:w-3/4 rounded-2xl p-2 mt-10 m-auto bg-white shadow-xl">
           <form onSubmit={submitHandler}> 
               <div className="sm: text-xs  lg:text-xl p-2">
                </div>
               
               <div className="p-2 w-full "> {/* Title Description */}
                 
                  <div className="sm: text-xs lg:text-xl p-2 flex">
                  <div className="w-1/4"> {/* Just for labels */}
                  <div className="mt-3"><label >Title: </label></div>
                  <div className="mt-3"><label>Description: </label></div>
               
                
                   </div>
               <div className="sm: text-xs lg:text-xl p-2">  {/* Input Fields title description */}
                     <input type="text" className="rounded-xl bg-gray-200 p-1 w-full mb-2" name="title" ref={titleRef}></input>
                    <input type="text" className="rounded-xl p-1 bg-gray-200 w-full" name="description" ref={descriptionRef}></input>
                    </div>
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

        <div className="sm:w-full text-xs lg:text-xl mt-2 p-4 flex border-t justify-between">  {/* Main for Photo and Category */}
          {/* Photo button */}
               <div
            className="inputBtn rounded-bl-lg flex justify-center  mt-3 w-1/5 "
            onClick={() => fileRef.current.click()}
          >  <p className="flex space-x-2">
          <UploadFileIcon  sx ={{ fontSize: 40 }} />{" "}
          <p className=" hidden sm:inline-flex text-xs font-semibold text-gray-600 sm:text-sm xl:text-2xl">
            Upload me!
          </p>
        </p>
        <input type="file" hidden ref={fileRef} onChange={addImageToPost} />
    
      </div>

                                {/* CATEGORY */}
                             
    <div className="text-xl flex">
      <FormControl sx={{ m:1, minWidth: 120 }}>
        <InputLabel htmlFor="grouped-select">Category</InputLabel>
        <Select
         defaultValue="" 
         value={category}
         id="grouped-select" 
         label="Category"
         onChange={(e) => setCategory(e.target.value)}
         >
          <MenuItem value="defaultCategory" selected>
            <em>Category</em>
          </MenuItem>
          {/* <ListSubheader>Category 1</ListSubheader> */}
          <MenuItem value="Math">Math</MenuItem>
          <MenuItem value="History">History</MenuItem>
          <MenuItem value="English">English</MenuItem>
          <MenuItem value="History">Science</MenuItem>
          <MenuItem value="Geography">Geography</MenuItem>
          <MenuItem value="History">Programming</MenuItem>
        </Select>
      </FormControl>
    </div>
      </div>
      </div>
                <div className="mt-2"> 
                  <Button  variant="contained" type="submit"endIcon={<SendIcon />}>Send</Button>
                </div>
           </form>
           </div>
                }
           <Connection/> 
         
            
        </div>
    )
}
        

export default Input
