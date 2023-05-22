import styles from './Inputfield.module.css'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";



const schema = yup.object({
    email: yup.string().required(),
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
             {...register("email")}
            type="text" 
            placeholder='Enter your username'
            />
            {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
        </div>
        <div className={styles.field}> 
            <label className={styles.label}>Password</label>
            <input className={styles.Inputfield}
                type="password" 
                {...register("password")}
                placeholder='Enter your password'
            />
             {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
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