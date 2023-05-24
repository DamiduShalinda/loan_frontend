import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Navbar } from "../Components/Navbar"
import { Inputbox } from '../Components/Inputbox';

const schema = yup.object({
    username: yup.string().required(),
    loandDate: yup.date().required(),
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
        console.log(data)
    }
  return (
    <div>
        <Navbar/>
        <form onSubmit={handleSubmit(onSubmit)} >
        <div>
            <Inputbox 
            label='user name'
            placeholder='Enter your customer name'
            {...register("username")}
            type='text'
            />
            {errors.username && <p className='text-red-600'>{errors.username?.message}</p>}
        </div>
        <div>
            <Inputbox 
            label='Loaned Date'
            placeholder='Enter your loan given date'
            {...register("username")}
            type='text'
            />
            {errors.username && <p className='text-red-600'>{errors.username?.message}</p>}
        </div>
        <div>
            <Inputbox 
            label='Loaned Value'
            placeholder='Enter loaned value'
            {...register("username")}
            type='text'
            />
            {errors.username && <p className='text-red-600'>{errors.username?.message}</p>}
        </div>
        <div>
            <Inputbox 
            label='Bike Number'
            placeholder='Enter bike number'
            {...register("username")}
            type='text'
            />
            {errors.username && <p className='text-red-600'>{errors.username?.message}</p>}
        </div>
        <div>
            <Inputbox 
            label='First Guarentees Name'
            placeholder='Enter first guarentees name'
            {...register("username")}
            type='text'
            />
            {errors.username && <p className='text-red-600'>{errors.username?.message}</p>}
        </div>
        <div>
            <Inputbox 
            label='Second Guarentees Name'
            placeholder='Enter second guarentees name'
            {...register("username")}
            type='text'
            />
            {errors.username && <p className='text-red-600'>{errors.username?.message}</p>}
        </div>
        
        <button type="submit" className='text-[15.42px] text-matt-gray font-bold  p-2 w-normla-width -bg-hasaru-yellow rounded-xl'>Sign In</button>
    </form>
        
    </div>
  )
}

export default AddNewLoans