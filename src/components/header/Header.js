import React from 'react'
import Hero from '../authform/Hero'
import { useContextProvider } from '../../context/StateProvider';
import firebase from "firebase";
//mui icons
import LogoutIcon from '@mui/icons-material/Logout';



function Header() {
    const [{ appUser } , dispatch] = useContextProvider(); //  Import all user information from database from reducer.js
        // console.log('i am appuser', appUser)  

        const signOutThing = () => {
            firebase.auth().signOut();
            dispatch({
              type: "user",
              payload: {},
            });
          };

    return (
        <div className="w-full h-15 flex justify-between p-2">
                {/* If there is no user dont display logout and welcome */}
         {appUser.uid && 
            <div className="w-3/4">
                <p className='sm:text-l lg:text-2xl'>Welcome Back</p>
                <p className='sm:text-l lg:text-2xl'>{appUser?.email}</p>
            </div> 
            }            
          {appUser.uid &&
            <div className="flex p-2 " onClick={signOutThing}>
                <a href="">
            <p className="sm:text-l lg:text-2xl">Logout<LogoutIcon sx ={{ fontSize: 30 }}/></p>   
                </a>
            </div>
                }
        </div>
    )
}

export default Header
