import styles from './Login.module.css'
import Homelogo from '../Components/Homelogo'
import Inputfield from '../Components/Inputfield'

const Login = () => {

  
  return (
    <div>
      <div>
      <div className={styles.container}>
        <div className={styles.logo}><Homelogo/></div>
        <div className={styles.line}><div className={styles.label}></div></div>
      
      <div className={styles.Inputfield}> <Inputfield/></div>
     
      </div>
    </div>
    </div>
  )
}

export default Login