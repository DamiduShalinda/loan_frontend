import styles from './HomeLogo.module.css'
import logo from '../assets/logo.png'

const Homelogo = () => {
  return (
    <div>
        <div className={styles.container}>
            <div>
                 <img src={logo} alt='Logo' className={styles.logoImage}/>
            </div>
            <div className={styles.label}>
                <p>
                    Hasaru Enterprices
                </p>
            </div>
        </div>
    </div>
  )
}

export default Homelogo