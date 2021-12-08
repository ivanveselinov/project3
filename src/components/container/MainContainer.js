import React from 'react'
import Header from '../header/Header'
import RightSideBar from '../rightSideBar/RightSideBar'
import InputDB from './InputDB'
import LeftSideBar from '../leftSideBar/LeftSideBar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Profile from '../profile/Profile'



function MainContainer() {
    return (
        <div className="bg-gray-100 " >
            <Header />
            
            <Router>
                <nav>
                    <div className="justify-between flex p-3 text-xl  border bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 ">
                      <a href="/">Home</a>
                      <a href="/profile">Profile</a>
                    </div>
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
