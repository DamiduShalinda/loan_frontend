import { Box, Button, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';

type PaymentInputsProps = {
    id : number;
}

type formValues = {
    payment_amount: number;
    payment_date: Date;
    loan_id: number;
}

function PaymentInputs({id}: PaymentInputsProps) {

    const form = useForm({
        initialValues: { payment_amount: 0 , payment_date: new Date() , loan_id: id },

        validate : {
            payment_amount: (value) => value < 0 ? 'Payment Amount cannot be negative' : null,
            payment_date: (value) => value > new Date() ? 'Payment Date cannot be in future' : null,

        }
      });

      function handleSubmit(values: formValues) {
        console.log(values);
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