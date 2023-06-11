import { useForm } from '@mantine/form';
import { NumberInput,  Button, Box } from '@mantine/core';


interface LoanCalculatorProps {
  loanAmount: number,
  interestRate: number,
  loanyears: number,
  loanMonths: number,
}

interface Props {
  onSubmit:(data: LoanCalculatorProps)=>void;
}

function LoanCalculatorInputs({ onSubmit }: Props) {
  const form = useForm<LoanCalculatorProps>({
    initialValues: {
      loanAmount: 0,
      interestRate: 42,
      loanyears: 0,
      loanMonths: 0,
     },

    // functions will be used to validate values at corresponding key
    validate: {
      loanAmount: (value) => value <= 0 && 'Loan Amount cannot be negative',
      interestRate: (value) => value <= 0 && 'Interest Rate cannot be negative',
      loanyears: (value, values) => {
        if (value <= 0 && !values.loanMonths) {
          return 'Please fill either Loan Years or Loan Months';
        }
        return undefined;
      },
      loanMonths: (value, values) => {
        if (value <= 0 && !values.loanyears) {
          return 'Please fill either Loan Years or Loan Months';
        }
        return undefined;
      },

    },
  });



  return (
    <Box maw={320} mx="auto">
      <form onSubmit={form.onSubmit(onSubmit)}>
        <NumberInput
          mt="sm"
          label="Loan Amount"
          placeholder="Loan Amount"
          min={0}
          hideControls
          withAsterisk
          {...form.getInputProps('loanAmount')}
        />
        <NumberInput
          mt="sm"
          label="Interest Rate"
          placeholder="Interest Rate"
          min={0}
          max={99}
          hideControls
          withAsterisk
          {...form.getInputProps('interestRate')}
        />
        <NumberInput
          mt="sm"
          label="Loan Years"
          placeholder="Loan Years"
          min={0}
          max={99}
          hideControls
          withAsterisk
          {...form.getInputProps('loanyears')}
        />
        <NumberInput
          mt="sm"
          label="Loan Months"
          placeholder="Loan Months"
          min={0}
          max={99}
          hideControls
          withAsterisk
          {...form.getInputProps('loanMonths')}
        />

        <Button type="submit" mt="sm">
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default LoanCalculatorInputs;