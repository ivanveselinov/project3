import React from 'react'
import ReadDB from './ReadDB'
import { useContextProvider } from '../../context/StateProvider'

function Input() {
    
    const [{appUser}, dispatch] = useContextProvider();

    return (
        <div className="w-1/2 border ">

           <div className="w-3/4 border mt-10 m-auto h-40">
           {appUser.emai}
           </div>
           <ReadDB />
        </div>
    )
}

export default Input
