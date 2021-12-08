import React from 'react'
import Button from '@mui/material/Button';

//mui

import Input from '@mui/material/Input';



const ariaLabel = { 'aria-label': 'description' };

const Login = (props) => {

    const {
       email, 
       setEmail,
        password, 
         setPassword,
          handleLogin,
            handleSignup,
             hasAccount, 
              setHasAccount, 
               emailError, 
                passwordError
            } = props;

    return (

     
    
       
        
      
        <selection>
     
            <label>User name:</label>
        
            <Input 
            className=" h-10 ml-2 text-xl"
            placeholder="noname@gmail.com"
            type="text" 
            autoFocus 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            inputProps={ariaLabel} 

            />
            <p className="bg-red-500 mt-2">{emailError}</p>
           
           
            <label className="text-2xl p-2 ">Password: </label>
            <Input
            className="bg-white-100 ml-2 h-10 mt-10 text-2xl mb-10"
            placeholder="Password"
            type="password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            inputProps={ariaLabel} 
            />
            <p className="bg-red bg-red-500 mt-2">{passwordError}</p>  
      
          

           <div  className="text-center w-full mt-1 ">
               {hasAccount ? (    // on click switch on sign in and sign up
                   <> 
                   <Button variant="outlined" onClick={handleSignup}>Sign Up</Button>
                   <p className="p-2">Have an account ?<Button onClick={() => setHasAccount(!hasAccount)} variant="outlined"> Sign in </Button></p> 
                   </>
                 ) : ( 
                   <>
                 <Button variant="outlined" onClick={handleLogin}>Sign In</Button>
                <p>Don't have an account ? <Button variant="outlined" onClick={() => setHasAccount(!hasAccount)}>Sign Up</Button></p>
                  </>
               )}
           </div>

         </selection>   
    )
}

export default Login
