import styles from './Login.module.css'
import Homelogo from '../Components/Homelogo'
import Inputfield from '../Components/Inputfield'
import { useState } from 'react'

const Login = () => {

  const [token , setToken] = useState("");


  
  function handleSubmit(val:any) {
    console.log(val)
  }

  return (
    <div>
      <div>
      <div className={styles.container}>
        <div className={styles.logo}><Homelogo/></div>
        <div className={styles.line}><div className={styles.label}></div></div>
      
      <div className={styles.Inputfield}> <Inputfield onSubmit={(val:any)=>handleSubmit(val)}/></div>
     
      </div>
    </div>
    </div>
  )
}

export default Login