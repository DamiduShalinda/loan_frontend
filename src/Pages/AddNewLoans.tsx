import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Navbar } from "../Components/Navbar"
import styles from './AddNewLoans.module.css'

const schema = yup.object({
    customername: yup.string().required(),
    loandDate: yup.string().required(),
    loandValue: yup.number().required(),
    bikeNumber: yup.string().required(),
    guarenteesName1: yup.string().required(),
    guarenteesTele1: yup.number().required(),
    guarenteesName2: yup.string().required(),
    guarenteesTele2: yup.number().required(),
     branchLocation: yup.string().required(),
  }).required();

  type LoanFormData = yup.InferType<typeof schema>;

const AddNewLoans = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoanFormData>({
        resolver: yupResolver(schema)
    });


    const onSubmit = (data: LoanFormData) => {
        console.log('clicked');
        console.log(data)
    }
  return (
    <div>
        <Navbar/>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 mx-28 mt-7 " >
        <h1 className="text-white text-4xl font-bold">Add New Loans</h1>
        <hr className="mb-5"/>
        <div className="flex flex-row gap-6">
        <div className='flex flex-col'>
            <label className={styles.labelField}>Customer name</label>
            <input className={`${styles.inputField} ${styles.customInputField}`}
             {...register("customername")}
            type="text" 
            placeholder='Enter your username'
            />
            {errors.customername && <p className='text-red-600 text-sm'>* required field</p>}
        </div>
         <div className='flex flex-col'> 
            <label className={styles.labelField}>
                Branch Location</label>
            <input className={styles.inputField}
                type="text" 
                {...register("branchLocation")}
                placeholder='Enter your branch location'
            />
             {errors.branchLocation && <p className='text-red-600 text-sm'>* required field</p>}
        </div>
        </div>
        <div className="flex flex-row gap-6">
        <div className='flex flex-col'> 
            <label className={styles.labelField}>
                Loaned Date</label>
            <input className={styles.inputField}
                type="text" 
                {...register("loandDate")}
                placeholder='Enter your password'
            />
             {errors.loandDate && <p className='text-red-600 text-sm'>* required field</p>}
        </div>
        <div className='flex flex-col'> 
            <label className={styles.labelField}>
                Loaned Value</label>
            <input className={styles.inputField}
                type="number" 
                {...register("loandValue")}
                placeholder='Enter your loan Value'
            />
             {errors.loandValue && <p className='text-red-600 text-sm'>* required field</p>}
        </div>
        </div>
        <div className='flex flex-col'> 
            <label  className={styles.labelField}>
                Bike Number</label>
            <input className={styles.inputField}
                type="text" 
                {...register("bikeNumber")}
                placeholder='Enter Bike Number'
            />
             {errors.bikeNumber && <p className='text-red-600 text-sm'>* required field</p>}
        </div>
        <div><p className="text-white">First Guarantee</p></div>
        <div className="flex flex-row gap-6">
        <div className='flex flex-col'> 
            <label className={styles.labelField}>
                Guarantee's Name</label>
            <input className={styles.inputField}
                type="text" 
                {...register("guarenteesName1")}
                placeholder='Enter first guarentees Name'
            />
             {errors.guarenteesName1 && <p className='text-red-600 text-sm'>* required field</p>}
        </div>
        <div className='flex flex-col'> 
            <label className={styles.labelField}>
                Guarantee's Tel</label>
            <input className={styles.inputField}
                type="tel" 
                {...register("guarenteesTele1")}
                placeholder='Enter first guarentees Tele'
            />
             {errors.guarenteesTele1 && <p className='text-red-600 text-sm'>* required field</p>}
        </div>
        </div>
        <div><p className="text-white">Second Guarantee</p></div>
        <div className="flex flex-row justify-between mt-3">
        <div className="flex flex-row gap-6">
        <div className='flex flex-col'> 
            <label className={styles.labelField}>
                Guarantee's Name</label>
            <input className={styles.inputField}
                type="text" 
                {...register("guarenteesName2")}
                placeholder='Enter second guarentees Name'
            />
             {errors.guarenteesName2 && <p className='text-red-600 text-sm'>* required field</p>}
        </div>
        <div className='flex flex-col'> 
            <label className={styles.labelField}>
                Guarantee's Tel</label>
            <input className={styles.inputField}
                type="tel" 
                {...register("guarenteesTele2")}
                placeholder='Enter second guarentees Tele'
            />
             {errors.guarenteesTele2 && <p className='text-red-600 text-sm'>* required field</p>}
        </div>  
        </div>  
            <div>
            <button type="submit" className='text-[15.42px] text-matt-gray font-bold h-[42px] p-2 w-normla-width -bg-hasaru-yellow rounded-xl mt-5'
            >Add New Loans</button>
            </div>
            </div>
    </form>
        
    </div>
  )
}

export default AddNewLoans