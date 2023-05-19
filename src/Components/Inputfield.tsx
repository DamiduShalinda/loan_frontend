import  { useState } from 'react'
import styles from './Inputfield.module.css'

const Inputfield = () => {

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
        }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(inputs);
        }

  return (
    <div className={styles.form}>
    <form onSubmit={handleSubmit} >
        <div className={styles.field}>
            <label className={styles.label}>Email Address</label>
            <input className={styles.Inputfield}
            type="text" 
            name="username" 
            value={inputs.username || ""} 
            onChange={handleChange}
            placeholder='Enter your email address'
            />
        </div>
        <div className={styles.field}> 
            <label className={styles.label}>Password</label>
            <input className={styles.Inputfield}
                type="text" 
                name="password" 
                value={inputs.password || ""} 
                onChange={handleChange}
                placeholder='Enter your password'
            />
        </div>
        <div className={styles.textlabel}>
            <p>Forgot Password?</p>
        </div>
        <div className={styles.btn_submit}>
            <input type="submit" className={styles.btn_submit_label} value={'Log In'}/>
        </div>
    </form>
    </div>
  )
}

export default Inputfield