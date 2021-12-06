import React from 'react'
import Header from '../header/Header'
import LeftSideBar from './LeftSideBar'
import Read from './ReadDB'
import InputDB from './InputDB'
import RightSideBar from './RightSideBar'

function MainContainer() {
    return (
        <div >
            <Header />
            <div className="justify-between flex border h-screen ">
            <LeftSideBar/>
            <InputDB />
            <RightSideBar/>
            
            
            </div>
        
        </div>
    )
}

export default MainContainer
