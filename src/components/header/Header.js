import React from 'react'
import Hero from '../authform/Hero'
import { useContextProvider } from '../../context/StateProvider';
import firebase from "firebase";
//mui icons
import LogoutIcon from '@mui/icons-material/Logout';



function Header() {
    const [{ appUser } , dispatch] = useContextProvider(); //  Import all user information from database from reducer.js
        console.log('i am appuser', appUser)  

        const signOutThing = () => {
            firebase.auth().signOut();
            dispatch({
              type: "user",
              payload: {},
            });
          };

    return (
        <div className="w-full h-32 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 flex justify-between">
            <div className="w-3/4">
                <p>Welcome Back: {appUser?.email}</p>
            </div> 
         
            <div className="flex p-2 " onClick={signOutThing}>
                <a href="">
            <p className="visible">Logout<LogoutIcon/></p>   
                </a>
             
            </div>
        </div>
    )
}

export default Header
