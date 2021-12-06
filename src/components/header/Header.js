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
        <div className="w-full h-20 border bg-blue-100">
            <div className="flex overflow-hidden" onClick={signOutThing}>
                <p>Welcome Back: {appUser?.email}
                 </p>
            </div>
        </div>
    )
}

export default Header
