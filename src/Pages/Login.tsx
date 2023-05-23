import styles from './Login.module.css'
import Homelogo from '../Components/Homelogo'
import Inputfield from '../Components/Inputfield'
import { useState } from 'react'
import { FormData } from '../Components/Inputfield'
import axios , { AxiosRequestConfig }  from "axios";

const Login = () => {

  const [token , setToken] = useState<FormData[]>([]);
  const baseURL = "http://127.0.0.1:8000/api/";

  async function handleLogin(userDetails:FormData) {

    try {
      const requestConfig : AxiosRequestConfig = {};
      requestConfig.data = { username: userDetails.username , password : userDetails.password}
      const { data } = await axios.get<FormData>(baseURL+'login' , requestConfig);
      console.log(data);
    } catch (error) {
      console.error();
    }
  }
  
  function handleSubmit(data: FormData) {
    console.log(data);
    handleLogin(data);
  }

  return (
    <div>
      <div>
      <div className={styles.container}>
        <div className={styles.logo}><Homelogo/></div>
        <div className={styles.line}><div className={styles.label}></div></div>
      
      <div className={styles.Inputfield}> <Inputfield onSubmit={(data: FormData)=>handleSubmit(data)}/></div>
     
      </div>
    </div>
    </div>
  )
}

export default Login