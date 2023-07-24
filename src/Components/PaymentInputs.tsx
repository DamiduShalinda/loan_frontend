import { Box, Button, Group, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { API_ENDPOINTS } from '../api';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type PaymentInputsProps = {
    id : number;
    onsubmit? : (valus : formValuesDateStr) => void;
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

function PaymentInputs({id , onsubmit}: PaymentInputsProps) {
    const [ clicked , setClicked ] = useState(false)
    const [ preview , setPreview ] = useState(true)
    const Navigate = useNavigate()
    const [ invoice , setInvoice ] = useState(false)

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
        setClicked(true);
        onsubmit && onsubmit(valuesDateStr);
        setPreview(false);
        
    }


    function convertDateToString(date: Date) {
        const dateStr = date.toISOString().split('T')[0]
        return dateStr
    }

    async function updateLoan(values : formValuesDateStr) {
        try {
            await axios.post(API_ENDPOINTS.addPayment, values)
            .then(res => {
                Navigate(`/viewinvoice/${values.payment_amount}/${values.payment_date}/${values.loan_number}`)
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
        <Group mt="sm" position="apart" >
        <Link to={`/viewinvoice/${form.values.payment_amount}/${convertDateToString(form.values.payment_date)}/${form.values.loan_number}.`}>
        <Button type="button" variant='filled' mt={'xl'} onClick={() => setInvoice(true)} disabled={preview}>
            Invoice Preview
        </Button>
        </Link>
        <Button type="submit" disabled={clicked} mt={'xl'}>
            Submit
        </Button>
        </Group>
        </Box>
        </form>
    </div>
  )
}

export default PaymentInputs