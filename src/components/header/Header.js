import React from 'react'
import Hero from '../authform/Hero'
import { useContextProvider } from '../../context/StateProvider';
import firebase from "firebase";



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
        <div className="w-full fixed h-32 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 flex">
            <div className="w-3/4 ">
            <p>Welcome Back: {appUser?.email}     </p>
                </div> 
         
            <div className="flex overflow-hidden p-2 ml-10 " onClick={signOutThing}>
            <p>Logout{appUser?.email}   </p>   
              
            
            </div>
        </div>
    )
}

export default Header
