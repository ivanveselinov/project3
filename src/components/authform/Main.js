import { useState, useEffect } from 'react';
import { fire } from '../../firebase/Firebase';
import Hero from './Hero';
import Login from './Login';

function Main() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(''); 
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }


  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  }

  const handleLogin = () => {
   clearErrors();
    fire
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((err) => {
      // eslint-disable-next-line default-case
      switch(err.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
        setEmailError(err.message);  
          break; 
        case "auth/wrong-password":
          setPasswordError(err.message);
          break;
      }
    });
  }

  const handleSignup = () => {
   clearErrors();
    fire
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch((err) => {
      // eslint-disable-next-line default-case
      switch (err.code){
        case "auth/email-already-in-use":
        case "auth/invalid-email":
        setEmailError(err.message);  
          break; 
        case "auth/weak password":
          setPasswordError(err.message);
          break;
      }
    })
  };

  const handleLogout = () => {
    fire.auth().signOut();
  }

////////////////////////////////////////////////////////

  //TO DOUBLE CHECK THIS CODE !!! SOME BUG IS IN IT!!

  // const authListener = () => {    // if user exist !
  //   fire.auth().onAuthStateChanged(user => {
  //     if (user){
  //       clearInputs();
  //       setUser(user);
  //     }else {
  //       setUser("");
  //     }
  //   })
  // }

  // useEffect(() => {
  //   authListener();
  // }, [user])

////////////////////////////////////////////////////////
    return ( 
    <div className="sm:w-full lg:w-full text-center m-auto text-2xl p-40 " >
      <p className="sm:text-2xl sm:font-bold mb-3 text-pink-600 font-bold lg:text-6xl underline text-center">Welcome to MLS </p>
      <div className="sm: w-3/4 lg:w-1/2 border text-center m-auto mb-10 rounded-xl bg-blue-200 p-4">
      {user ? (
          <Hero handleLogout={handleLogout}/>
      ) :  ( 
      <Login 
      email={email}
      setEmail={setEmail} 
      password={password} 
      setPassword={setPassword} 
      handleLogin={handleLogin}
      handleSignup={handleSignup}
      hasAccount={hasAccount} 
      setHasAccount={setHasAccount}
      emailError={emailError}
      passwordError={passwordError}
      />
      )}
      </div>
    </div>
    )
}

export default Main
