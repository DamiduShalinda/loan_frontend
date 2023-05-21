import  { useState } from 'react'
import styles from './Inputfield.module.css'
import axios from 'axios';

const Inputfield = () => {

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });

    const login = async ( username:string , password:string) => {

        try {
            const loginResponse = await axios.post('http://127.0.0.1:80/api/login', { username, password });
            console.log(loginResponse.data , 'successful');
        } catch (error) {
            console.log(error);
            
        }
    }

    const getUserDetails = async () => {
        try {
            const userResponse = await axios.get ('http://127.0.0.1:80/api/user');
            const userDetails = userResponse.data ;
            console.log(userDetails);
        } catch (error) {  
            console.error();
         }
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
        }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        login(inputs.username , inputs.password)
            .then(() => {
                getUserDetails();
            }
            )

        }

  return (
    <div className={styles.form}>
    <form onSubmit={handleSubmit} >
        <div className={styles.field}>
            <label className={styles.label}>User name</label>
            <input className={styles.Inputfield}
            type="text" 
            name="username" 
            value={inputs.username || ""} 
            onChange={handleChange}
            placeholder='Enter your username'
            />
        </div>
        <div className={styles.field}> 
            <label className={styles.label}>Password</label>
            <input className={styles.Inputfield}
                type="password" 
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