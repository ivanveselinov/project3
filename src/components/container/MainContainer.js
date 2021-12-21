import React from 'react'
import Header from '../header/Header'
import RightSideBar from '../rightSideBar/RightSideBar'
import InputDB from './InputDB'
import LeftSideBar from '../leftSideBar/LeftSideBar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Profile from '../profile/Profile'
import { useContextProvider } from '../../context/StateProvider'
//mui
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function MainContainer() {
    const [{appUser,admin, teachers}, dispatch] = useContextProvider();
    return (
        // bg-gradient-to-r from-white via-blue-100 to-green-100
        <div className="bg-gradient-to-r from-white via-blue-100 to-green-100 " >
        
            <Router>
                <nav>
                <Header />
                      <a className="hover:underline text-2xl p-2 text-red-500" href="/"><HomeIcon  sx={{fontSize: 30}}/>Home</a>
             {/* IF USER IS NOT TEACHER OR ADMIN HIDE PROFILE!! */}
                      { (appUser.uid === admin || appUser.uid === teachers ) &&
                      <a className="hover:underline text-2xl float-right mr-3 text-red-500" href="/profile"><AccountCircleIcon sx={{fontSize: 30}}/>Profile</a>
                    }     
                </nav>
            <Switch>  
     
                    <Route exact path="/profile">
                        <Profile/>
                    </Route>
                   
                <Route expact path="/">
                    <div className="justify-between flex border ">
                        <LeftSideBar/>
                        <InputDB />
                        <RightSideBar/>
                    </div>
                </Route>

            </Switch>
               
            </Router>
            
      
        </div>
    )
}

export default MainContainer
