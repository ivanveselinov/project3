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

  const authListener = () => {    // if user exist !
    fire.auth().onAuthStateChanged(user => {
      if (user){
        clearInputs();
        setUser(user);
      }else {
        setUser("");
      }
    })
  }

  useEffect(() => {
    authListener();
  }, [user])




    return (

    <div className="w-3/4 text-center m-auto mt-60 text-2xl border" >
      <p className="mb-3">Welcome to MLS Login or Sign up </p>
      <div className="w-1/2 border m-auto mb-10 bg-blue-100 p-4">
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
