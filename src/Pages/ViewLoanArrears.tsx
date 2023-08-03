import { useEffect, useState } from 'react'
import { Loader , Grid  , Button , Box , NumberInput, Group, Divider , Space, Title, List} from '@mantine/core'
import { formValues } from '../Components/LoanPayments'
import { API_ENDPOINTS } from '../api';
import axios, { AxiosResponse } from 'axios';
import { TableScrollArea } from '../Components/Tables/Table';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { Link, useParams } from 'react-router-dom';
import { TableViewPayments } from '../Components/Tables/TableViewPayments';


export interface loanArrearsInterface {
    id : number;
    monthly_payment : number;
    loan_id : string;
    staff : string;
    loan_values: number;
    additional_fees : number;
    monthly_arrears : number;
    arr_cal_date : string;
    customer_id : number;
}

interface paymentValuesBasic {
    payment_date: string;
    loan_number: string;
}

interface paymentValues extends paymentValuesBasic {
    payment_amount: number;
    interest : number;
    principle : number;
    balance : number;
    id : number;
}

interface paymentValueStr extends paymentValuesBasic {
    payment_amount: string;
    interest : string;
    principle : string;
    balance : string;
    id : string;
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
        .then((res : AxiosResponse<paymentValues[]>) => {
            setPayments(res.data);
            
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
    getPayments(loanid).then(() => {console.log(payments);})
    getArrears(loanid)
    form.setValues({
        loan_id : loanid,
        staff : arrears?.staff,
        arr_cal_date : arrears?.arr_cal_date
    })
    setLoading(false)
}, [loanid , ])

  return (
    <div>{loading || !id ? <Loader variant='dots'/> : 
        
    <div>
        <h2>Loan ID : {arrears?.loan_id}</h2>
        <Grid>
            <Grid.Col span={6}>
                {arrears?.loan_id ? 
            <div>
                <List mt={'md'}>
                    <List.Item mb={'1vh'}><b>Monthly Payment : </b>{arrears?.monthly_payment}</List.Item>
                    <List.Item mb={'1vh'}><b>Additional Fees : </b>{arrears?.additional_fees}</List.Item>
                    <List.Item mb={'1vh'}><b>Monthly Arrears : </b>{arrears?.monthly_arrears}</List.Item>
                    <List.Item mb={'1vh'}><b>Arrears Calculation Date : </b>{arrears?.arr_cal_date}</List.Item>
                    <List.Item mb={'1vh'}><b>Assigned Staff : </b>{arrears?.staff}</List.Item>
                </List>
                <Group>
                    <Link to={`/customer/${arrears?.customer_id}`}>
                        <Button variant='outline' color='blue' mt={'md'} ml={'xl'}>View Customer Details</Button>
                    </Link>
                </Group>
                
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
        <Divider label="ALL PAYMENTS" labelPosition='center' />
        <Space h="lg" />
        <TableViewPayments data={payments}/>
    </div>
    }
    </div>
  )
}

export default ViewLoanArrears