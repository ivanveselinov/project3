

import Main from "./authform/Main";
import MainContainer from "./container/MainContainer";
import Header from "./header/Header";
import {useAuthState} from 'react-firebase-hooks/auth';
import { useEffect } from "react";
import { useContextProvider } from "../context/StateProvider";
import { auth } from "../firebase/Firebase";
import { Container } from "@mui/material";

function App() {

  const [user]= useAuthState(auth);
  const [{ appUser }, dispatch] = useContextProvider();
  useEffect(() => {
    if (user) {
      // user own everything
      dispatch({
        type: "user",
        payload: user,
      });
    }
  }, [user]);

  return (

    <div className="App">

      { user? <MainContainer /> : < Main/> }
             
    
                
   

      
  </div>
  );
}

export default App;
