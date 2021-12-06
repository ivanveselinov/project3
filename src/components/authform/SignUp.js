import { TextField } from "@mui/material";
import { useState } from "react"


function SignUp() {
    
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const getEmail = ((e) => {
            setEmail(e.target.value);
        })

        const getPassword = ((e) => {
            setPassword(e.target.value);
        })

        
     

    return (
        <div>
            <form>
            <input type="email" placeholder="email" onChange={getEmail}/>
            <input type="password" placeholder="password" onChange={getPassword} />
            <button type="submit"></button>
            </form>
        </div>
    )
}    
export default SignUp