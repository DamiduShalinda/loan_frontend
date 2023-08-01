import axios from "axios";
import { useEffect, useState } from "react";
import React, { createContext } from "react";
import { FormData } from "../Components/Inputfield";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../api";
import { notifications  } from '@mantine/notifications'; 
import { IconX } from '@tabler/icons-react';


type AuthContextProps = {
  contextData: {
    user: any;
    loginUser: (data: FormData) => void;
    logOutUser: () => void;
    authTokens: any;
  };
};

const AuthContext = createContext<AuthContextProps>({ 
  contextData: {
    user: null,
    loginUser: () => {},
    logOutUser: () => {},
    authTokens: null,
  },
});

export default AuthContext;

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children
  }) => {

  const authTokensString = localStorage.getItem("authTokens");
  const savedAuthTokens = authTokensString ? JSON.parse(authTokensString) : null;
  const savedUsers = authTokensString ? jwtDecode(authTokensString) : null;
  const [authTokens, setAuthTokens] = React.useState(savedAuthTokens)
  const [user, setUser] = React.useState(savedUsers)
  const [loading , setLoading] = useState(true)
  const Navigate = useNavigate()

  
 const loginUser = async (data:FormData) => {
  await axios
    .post('http://127.0.0.1:8000/users/token/', data)
    .then((response) => {

      if (response.status == 200) {
        setAuthTokens(response.data)
        setUser(jwtDecode(response.data.access))
        console.log(user)
        localStorage.setItem("authTokens", JSON.stringify(response.data)) 
        if (user.usertype == "staff") {
          Navigate("/homepage")
        }
      }else {
        console.log("error")
        notifications.show({
          title: 'Login Failed',
          message: 'Please check your username and password',
          color: 'red',
          autoClose: 5000,
          icon : <IconX/>
      })
    }
    })
    .catch((error) => {
      // Handle login error
      notifications.show({
        title: 'Login Failed',
        message: 'Please check your username and password',
        color: 'red',
        autoClose: 5000,
        icon : <IconX/>
    })
    });
};

  const logOutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens")
    Navigate("/")
  }

  const updateToken = async () => {
    axios.post(API_ENDPOINTS.refreshUser , { refresh: authTokens?.refresh })
    .then((response) => {
  
        if (response.status == 200) {
          setAuthTokens(response.data)
          setUser(jwtDecode(response.data.access))
          localStorage.setItem("authTokens" , JSON.stringify(response.data))
        }else {
          logOutUser()
          console.error('error' , response.status);
          
        }
  
      }).catch((error) => {
        console.error("error" , error)
      })
   }


   useEffect(() => {

    const fourMinutes = 4 * 60 * 1000
    const interval = setInterval(() =>{
        if (authTokens) {
         updateToken()
        }
    } , fourMinutes)
  
      return () => clearInterval(interval)
  
   }, [authTokens, loading ])
   
 
   const contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logOutUser: logOutUser
 }

  return (
    <AuthContext.Provider value={{ contextData }}>
      {children}
    </AuthContext.Provider>
  );
};