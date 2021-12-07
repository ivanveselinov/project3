import React from 'react'
import Header from '../header/Header'
import RightSideBar from '../rightSideBar/RightSideBar'
import InputDB from './InputDB'
import LeftSideBar from '../leftSideBar/LeftSideBar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Profile from '../profile/Profile'



function MainContainer() {
    return (
        <div >
            <Header />
            
            <Router>
                <nav>
                    <div className="justify-between flex p-3 text-xl ">
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
