import { useEffect, useState } from 'react'
import { Loader , Grid  , Button , Box , NumberInput, Group} from '@mantine/core'
import { formValues } from '../Components/LoanPayments'
import { API_ENDPOINTS } from '../api';
import axios from 'axios';
import { TableScrollArea } from '../Components/Tables/Table';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { useParams } from 'react-router-dom';

interface AccessParams {
    id : string;
}

export interface loanArrearsInterface {
    id : number;
    monthly_payment : number;
    loan_id : string;
    staff : number;
    loan_values: number;
    additional_fees : number;
    monthly_arrears : number;
    arr_cal_date : string;
}

 interface loanArrearsSubmitInterfaceBasic {
    loan_id : number;
    staff? : number;
    additional_fees : number;
}

interface loanArrearsSubmitInterface extends loanArrearsSubmitInterfaceBasic {
    arr_cal_date : Date;
}

export interface loanArrearsSubmitInterfacewitString extends loanArrearsSubmitInterfaceBasic {
    arr_cal_date : string;
}

function ViewLoanArrears() {

    const [ loading , setLoading ] = useState<boolean>(true)
    const [ payments , setPayments ] = useState<formValues[]>([])
    const [ arrears , setArrears ] = useState<loanArrearsInterface>()
    const { id } = useParams<{id : string}>();
    const loanid = Number(id)


    const form = useForm({
        initialValues: { 
            loan_id : loanid,
            staff : arrears?.staff,
            arr_cal_date : arrears?.arr_cal_date,
            additional_fees : 0
         },
    
        // functions will be used to validate values at corresponding key
        validate: {
          loan_id: (value) => (value ? undefined : 'Loan ID is required'),
          arr_cal_date: (value) =>(value ? undefined : 'this field is required'),
        },
      });

      const handleSubmit = (values: loanArrearsSubmitInterface) => {
        const updatedValues: loanArrearsSubmitInterfacewitString = {
            ...values,
            arr_cal_date : values.arr_cal_date.toISOString().slice(0, 10),
            staff : arrears?.staff
        }
        console.log(updatedValues);
        submitArrears(updatedValues)
        form.reset()
      }
      
async function submitArrears(values: loanArrearsSubmitInterfacewitString) {
          try {
              await axios.post(API_ENDPOINTS.calculateArrears , values)
              .then(res => {
                    console.log(res.data)
                    getArrears(loanid)
              })
          } catch (error) {
              console.log(error);
          }
      }
      
async function getPayments(id : number) {
    try {
        await axios.get(API_ENDPOINTS.getAllpayments(id))
        .then(res => {
            const tempdata: formValues[] = []
            res.data.forEach((item: formValues) => {
                tempdata.push(item)
            }
            )
            setPayments(tempdata)
        })
    } catch (error) {
        console.log(error);
    }
}

async function getArrears(id : number) {
    try {
        await axios.get(API_ENDPOINTS.getArrears(id))
        .then(res => {
            setArrears(res.data);
        })
    } catch (error) {
        console.log(error);
    }
}

useEffect(() => {
    getPayments(loanid)
    getArrears(loanid)
    form.setValues({
        loan_id : loanid,
        staff : arrears?.staff,
        arr_cal_date : arrears?.arr_cal_date
    })
    setLoading(false)
}, [loanid])

  return (
    <div>{loading || !id ? <Loader variant='dots'/> : 
        
    <div>
        <h3>Arrears</h3>
        <h2>Loan ID : {arrears?.loan_id}</h2>
        <Grid>
            <Grid.Col span={7}>
                {arrears?.loan_id ? 
            <div>
                <h4>Monthly Payment : {arrears?.monthly_payment}</h4>
                <h4>Monthly Arrears : {arrears?.monthly_arrears}</h4>
                <h4>Arrears Calculation Date : {arrears?.arr_cal_date}</h4>
                <h4>Additional Fees : {arrears?.additional_fees ? arrears.additional_fees : "none"}</h4>
                <h4>Staff : {arrears?.staff}</h4>
            </div>
                : <h4>No Arrears Calculated</h4>}
            </Grid.Col>
            <Grid.Col span={4}>
                <Box>
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                    <DateInput
                        valueFormat="YYYY MMM DD"
                        label="Arrears Calculation Date"
                        placeholder="YYYY MM DD"
                        mx="auto"
                        required
                        mt='md'
                        {...form.getInputProps('arr_cal_date')}
                        />
                     <NumberInput
                        label="Additional Fees"
                        placeholder="Additional Fees"
                        mx="auto"
                        mt='md'
                        required
                        hideControls
                        {...form.getInputProps('additional_fees')}
                        />
                        <Group position="right" mt="lg">
                        <Button type="submit" variant="default" color="blue">
                            Submit
                        </Button>
                        </Group>
                    </form>
                </Box>
            </Grid.Col>
            <Grid.Col span={1}>
            </Grid.Col>
        </Grid>
        <h3>Payments</h3>
        <TableScrollArea data={payments} headers={['payment_amount' , 'payment_date' , 'interest' , 'principal' , 'balance']}/>
    </div>
    }
    </div>
  )
}

export default ViewLoanArrears