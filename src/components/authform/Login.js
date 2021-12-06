import React from 'react'


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
            <p>{emailError}</p>
           
           
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
            <p>{passwordError}</p>  
      
          

           <div  className="text-center w-full mt-1">
               {hasAccount ? (    // on click switch on sign in and sign up
                   <>
                   <button onClick={handleLogin} className=" bg-gray-400">Sign In</button>
                   <button>Don't have an account ? <span onClick={() => setHasAccount(!hasAccount)} className="border bg-gray-400">Sign Up</span></button>
                   </>
                 ) : ( 
                   <>
                <button onClick={handleSignup} className="border bg-gray-400">Sign Up</button>
                <button>Have an account ? <span onClick={() => setHasAccount(!hasAccount)}>Sign In</span></button>
                  </>
               )}
           </div>

         </selection>   
    )
}

export default Login
