import React from 'react'
import Category from './Category';
//mui
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { useContextProvider } from '../../context/StateProvider';


export default function LeftSideBar() {
    return (
        <div className="w-1/4 border">
            {/* checkbox list */}
           <FormGroup>
               <Category control={<Checkbox defaultChecked />} label="All" />
               <Category control={<Checkbox defaultChecked />} label="Math" />
               <Category control={<Checkbox defaultChecked />} label="English" />
               <Category control={<Checkbox defaultChecked />} label="History" />
               <Category control={<Checkbox defaultChecked />} label="Geography" />
               {/* <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
           </FormGroup>
        </div>
    )
}
