import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Navbar } from "../Components/Navbar"
import styles from './AddNewLoans.module.css'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = yup.object({
    name: yup.string().required(),
    surname: yup.string().required(),
    address: yup.string().required(),
    dateofbirth: yup.string().required(),
    email: yup.string().required(),
    telephone1: yup.number().required(),
    telephone2: yup.number().required(),
    nicnumber: yup.string().required(),
    username: yup.string().required(),
  }).required();

  export type CustomerFormData = yup.InferType<typeof schema>;

const AddNewCustomers = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<CustomerFormData>({
        resolver: yupResolver(schema)
    });

    const showToastMessage = () => {
        toast.success('Success Notification !', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };


    const onSubmit = (data: CustomerFormData) => {
        axios.post('http://localhost:8000/customers/addcustomers/', data)
        .then(res => {
            console.log(res.data);
            showToastMessage();
        });
    }
    

  return (
    <div>
        <Navbar/>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 mx-28 mt-7 max-h-full grow " >
        <h1 className="text-white text-2xl font-bold">ADD NEW CUSTOMERS ....</h1>
        <hr className="mb-5"/>
        <div className="flex flex-row gap-6">
        <div className='flex flex-col'>
            <label className={styles.labelField}>Sur Name</label>
            <input className={`${styles.inputField} ${styles.inputField}`}
             {...register("surname")}
            type="text" 
            placeholder='Enter surname'
            />
            {errors.surname && <p className='text-red-600 text-sm'>* required field</p>}
        </div>
         <div className='flex flex-col'> 
            <label className={styles.labelField}>
                Customer Name</label>
            <input className={styles.inputField}
                type="text" 
                {...register("name")}
                placeholder='Enter Customer Name'
            />
             {errors.name && <p className='text-red-600 text-sm'>* required field</p>}
        </div>
        </div>
        <div className="flex flex-row gap-6">
        <div className='flex flex-col'> 
            <label className={styles.labelField}>
                Address</label>
            <input className={styles.inputField}
                type="text" 
                {...register("address")}
                placeholder='Enter address'
            />
             {errors.address && <p className='text-red-600 text-sm'>* required field</p>}
        </div>
        <div className='flex flex-col'> 
            <label className={styles.labelField}>
                email</label>
            <input className={styles.inputField}
                type="email" 
                {...register("email")}
                placeholder='Enter email'
            />
             {errors.email && <p className='text-red-600 text-sm'>* required field</p>}
        </div>
        </div>
        <div className='flex flex-col'> 
            <label className={styles.labelField}>
                Customer Name</label>
            <input className={styles.inputField}
                type="date" 
                {...register("dateofbirth")}
                placeholder='Enter Date of birth'
            />
             {errors.dateofbirth && <p className='text-red-600 text-sm'>* required field</p>}
        </div>
        <div className="flex flex-row gap-6">
        <div className='flex flex-col'> 
            <label  className={styles.labelField}>
                Telephone 1</label>
            <input className={styles.inputField}
                type="text" 
                {...register("telephone1")}
                placeholder='Telephone 1'
            />
             {errors.telephone1 && <p className='text-red-600 text-sm'>* required field</p>}
        </div>
        <div className="flex flex-row gap-6">
        <div className='flex flex-col'> 
            <label className={styles.labelField}>
                Telephone 2</label>
            <input className={styles.inputField}
                type="text" 
                {...register("telephone2")}
                placeholder='Telephone 2'
            />
             {errors.telephone2 && <p className='text-red-600 text-sm'>* required field</p>}
        </div>
        </div>
        </div>
        <div className="flex flex-row justify-between">
        <div className='flex flex-col'> 
            <label className={styles.labelField}>
                NIC number</label>
            <input className={styles.inputField}
                type="tel" 
                {...register("nicnumber")}
                placeholder='Enter your nic'
            />
             {errors.nicnumber && <p className='text-red-600 text-sm'>* required field</p>}
        </div>
        
            <div>
            <input type="submit" className='text-[15.42px] text-matt-gray font-bold h-[42px] p-2 w-normla-width -bg-hasaru-yellow rounded-xl mt-5'
            value="Add New Customer"/>
            </div>
            </div>
        <div className='flex flex-col'> 
            <label className={styles.labelField}>
                Username</label>
            <input className={styles.inputField}
                type="tel" 
                {...register("username")}
                placeholder='Enter a username'
            />
             {errors.username && <p className='text-red-600 text-sm'>* required field</p>}
        </div>
    </form>
    <ToastContainer />
    </div>
  )
}

export default AddNewCustomers