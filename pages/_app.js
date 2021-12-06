import '../styles/assests/common.css'
import '../styles/assests/main copy.css'
import '../styles/assests/main.css'
import '../styles/assests/responsive.css'
import '../styles/assests/bootstrap.css'
import { createContext, useState } from 'react';
export const UserContext=createContext();

function MyApp({ Component, pageProps }) {
  const [loggedInUser,setLoggedInUser]=useState({});
  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <Component {...pageProps} /> 
      </UserContext.Provider>
  )

  
}

export default MyApp
