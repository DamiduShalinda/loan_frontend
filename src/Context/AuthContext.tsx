import axios from "axios";
import { useEffect, useState } from "react";
import React, { createContext } from "react";
import { FormData } from "../Components/Inputfield";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../api";

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

  
const loginUser = (data:FormData) => {
  axios
    .post(API_ENDPOINTS.getUser, data)
    .then((response) => {

      if (response.status == 200) {
        setAuthTokens(response.data)
        setUser(jwtDecode(response.data.access))
        console.log("success")
        console.log(authTokens)
        localStorage.setItem("authTokens", JSON.stringify(response.data)) 
        Navigate("/homepage")
      }else {
        console.log("error")
      }

    })
    .catch((error) => {
      // Handle login error
      console.error("Login failed:", error);
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