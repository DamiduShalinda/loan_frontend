import { Box, Button, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { API_ENDPOINTS } from '../api';

type PaymentInputsProps = {
    id : number;
}

type formValues = {
    payment_amount: number;
    payment_date: Date;
    loan_number: number;
}

type formValuesDateStr = {
    payment_amount: number;
    payment_date: string;
    loan_number: number;
}

function PaymentInputs({id}: PaymentInputsProps) {

    const form = useForm({
        initialValues: { payment_amount: 0 , payment_date: new Date() , loan_number: id },

        validate : {
            payment_amount: (value) => value < 0 ? 'Payment Amount cannot be negative' : null,
            payment_date: (value) => value > new Date() ? 'Payment Date cannot be in future' : null,

        }
      });

      function handleSubmit(values: formValues) {
        const dateStr = convertDateToString(values.payment_date)
        const valuesDateStr: formValuesDateStr = {
            payment_amount: values.payment_amount,
            payment_date: dateStr,
            loan_number: values.loan_number,
        }
        updateLoan(valuesDateStr);
    }


    function convertDateToString(date: Date) {
        const dateStr = date.toISOString().split('T')[0]
        return dateStr
    }

    async function updateLoan(values : formValuesDateStr) {
        try {
            await axios.post(API_ENDPOINTS.addPayment, values)
            .then(res => {
                console.log(res.data);
            })
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
        <form onSubmit={form.onSubmit(() => handleSubmit(form.values))}>
        <Box mx="lg" mt={"xl"} miw={300}>
        <TextInput mt="sm" label="Payment Amount" placeholder="Payment Amount"  {...form.getInputProps('payment_amount')} withAsterisk />
        <DatePickerInput mt="sm" label="Date" placeholder="Date" valueFormat="YYYY-MMM-DD" dropdownType='modal'{...form.getInputProps('payment_date')} withAsterisk/>
        <Button type="submit" mt="xl">
            Submit
        </Button>
        </Box>
        </form>
        
    </div>
  )
}

export default PaymentInputs