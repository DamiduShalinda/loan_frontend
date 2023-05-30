import styles from './Login.module.css'
import Homelogo from '../Components/Homelogo'
import Inputfield from '../Components/Inputfield'
import { FormData } from '../Components/Inputfield'
import AuthContext from '../Context/AuthContext'
import React from 'react'

const Login = () => {

  const  {contextData}  = React.useContext(AuthContext)

  return (
    <div>
      <div>
      <div className={styles.container}>
        <div className={styles.logo}><Homelogo/></div>
        
        <div className={styles.line}><div className={styles.label}></div></div>
      
      <div className={styles.Inputfield}>
         <Inputfield onSubmit={(data: FormData)=>contextData.loginUser(data)}/>
      </div>
     
      </div>
    </div>
    </div>
  )
}

export default Login