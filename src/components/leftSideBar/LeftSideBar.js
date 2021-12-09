import React from 'react'
import Category from './Category';
//mui
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { useContextProvider } from '../../context/StateProvider';


export default function LeftSideBar() {
    return (
        <div className="hidden lg:inline-block w-1/5 shadow-2xl text-2xl bg-white p-5">
            {/* checkbox list */}
           <FormGroup>
               <Category control={<Checkbox defaultChecked />} label="Math" />
               <Category control={<Checkbox defaultChecked />} label="History" />
               <Category control={<Checkbox defaultChecked />} label="English" />
               <Category control={<Checkbox defaultChecked />} label="Science" />
               <Category control={<Checkbox defaultChecked />} label="Geography" />
               <Category control={<Checkbox defaultChecked />} label="Programming" />
               {/* <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
           </FormGroup>
        </div>
    )
}
