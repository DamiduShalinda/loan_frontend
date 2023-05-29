import styles from './Login.module.css'
import Homelogo from '../Components/Homelogo'
import Inputfield from '../Components/Inputfield'
import { FormData } from '../Components/Inputfield'
import axios , { AxiosResponse , AxiosError }  from "axios";

const Login = () => {

  interface ErrorResponse {
    detail: string;
  }

  const baseURL = "http://127.0.0.1:8000/api/";


  function handleLogin(userDetails:FormData) {
    
       axios.post(baseURL+ 'login', { userDetails})
        .then((response: AxiosResponse) => {
          console.log('Response:', response.data.jwt);
          localStorage.setItem('token', response.data.jwt);
          console.log(localStorage.getItem('token'));
          if (localStorage.getItem('token') != null) {
            window.location.href = "/homepage";
          }
          })
        .catch((error: AxiosError) => {
          const errorResponse = error.response?.data as ErrorResponse;
          alert(errorResponse.detail);

      });
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