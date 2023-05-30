import styles from './Inputfield.module.css'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Link } from 'react-router-dom';


const schema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  }).required();

  export type FormData = yup.InferType<typeof schema>;

  interface Props {
    onSubmit:(data: FormData)=>void;
}

const Inputfield = ({onSubmit}:Props) => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

  return (
    <div className={styles.form}>
    <form onSubmit={handleSubmit(onSubmit)} >
        <div className={styles.field}>
            <label className={styles.label}>User name</label>
            <input className={styles.Inputfield}
             {...register("username")}
            type="text" 
            placeholder='Enter your username'
            />
            {errors.username && <p className='text-red-600'>{errors.username?.message}</p>}
        </div>
        <div className={styles.field}> 
            <label className={styles.label}>Password</label>
            <input className={styles.Inputfield}
                type="password" 
                {...register("password")}
                placeholder='Enter your password'
            />
             {errors.password && <p className='text-red-600 text-sm'>{errors.password?.message}</p>}
        </div>
        <div className={styles.textlabel}>
            <p>Forgot Password?</p>
        </div>
        <div className={styles.btn_submit}>
            <button type="submit" className={styles.btn_submit_label}>Sign In</button>
        </div>
        <div>
            <Link to='/loancalculator'><button type='button' className={styles.btn_calculator}>Loan Calculator</button></Link>
        </div>
    </form>
    </div>
  )
}

export default Inputfield