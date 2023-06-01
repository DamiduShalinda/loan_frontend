import styles from './LoanCalFields.module.css'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import React from 'react';
import { Link } from 'react-router-dom';


const schema = yup.object({
    loanAmount: yup.string().required(),
    interestRate: yup.string().default('42'),
    loanYears: yup.string().default('0'),
    loanMonths: yup.string().default('0'),
  }).required();

   export type CalcData = yup.InferType<typeof schema>;

   interface Props {
    onSubmit:(data: CalcData)=>void;
}

const LoanCalFields = ({onSubmit}:Props) => {

    const { register, handleSubmit, formState: { errors } , setValue} = useForm<CalcData>({
        resolver: yupResolver(schema)
    });

    React.useEffect(() => {
        setValue("interestRate", "42");
        setValue("loanYears", "0");
        setValue("loanMonths", "0");
    }, [setValue])

  return (
    <div className={styles.form}>
    <h1 className={styles.heading}>Loan Calculator...</h1>
    <form onSubmit={handleSubmit(onSubmit)} >
        <div className={styles.field}>
            <label className={styles.label}>Loan Amount</label>
            <input className={styles.Inputfield}
             {...register("loanAmount")}
            type="text" 
            placeholder='Loan Amount'
            />
            {errors.loanAmount && <p className='text-red-600 text-xs'>{errors.loanAmount?.message}</p>}
        </div>
        <div className={styles.field}> 
            <label className={styles.label}>Interest Rate (Default is 42%)</label>
            <input className={styles.Inputfield}
                type="text" 
                {...register("interestRate")}
                placeholder='Interest Rate'
            />
             {errors.interestRate && <p className='text-red-600 text-xs'>{errors.interestRate?.message}</p>}
        </div>
        <div className={styles.field}> 
            <input className={styles.specialInputfield}
                type="text" 
                {...register("loanYears")}
                placeholder='Loan Years'
            />
             {errors.loanYears && <p className='text-red-600 text-xs'>{errors.loanYears?.message}</p>}
        </div>
        <div className={styles.field}>
            <input className={styles.specialInputfield}
                type="text" 
                {...register("loanMonths")}
                placeholder='Loan Months'
            />
             {errors.loanMonths && <p className='text-red-600 text-xs'>{errors.loanMonths?.message}</p>}
        </div>
            <input type="submit" className={styles.btn_submit_label} value="Calculate"/>
            <Link to="/loancalculator">
            <input type="button" className={styles.btn_submit_label} value="Go Back"/>
            </Link>
    </form>
    </div>
  )
}

export default LoanCalFields