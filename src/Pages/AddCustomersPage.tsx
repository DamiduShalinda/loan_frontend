import { useForm,  isEmail, isInRange, hasLength } from '@mantine/form';
import { Button, Group, TextInput, NumberInput, Box , Input } from '@mantine/core';
import { useId } from '@mantine/hooks';
import { IMaskInput } from 'react-imask';
import { DatePickerInput } from '@mantine/dates';


interface customerFormData {
  surname: string;
  name: string;
  email: string;
  age: number;
  dateofbirth: Date;
  phoneNumber1: string;
  phoneNumber2: string;
  nicNumber: string;
}

function AddCustomersPage() {
  const id = useId();

  const form = useForm<customerFormData>({
    initialValues: {
      surname: '',
      name: '',
      email: '',
      age: 18,
      dateofbirth: new Date(),
      phoneNumber1: '',
      phoneNumber2: '',
      nicNumber: '',
    },

    validate: {
      name: hasLength({ min: 2, max: 10 }, 'Name must be 2-10 characters long'),
      email: isEmail('Invalid email'),
      age: isInRange({ min: 18, max: 99 }, 'You must be 18-99 years old to register'),
      phoneNumber1: hasLength(15, 'Phone number must be 10 characters long'),
      phoneNumber2: hasLength(15, 'Phone number must be 10 characters long'),
      nicNumber : (value) => {return value?.length === 10 && /^[0-9]{9}[vV]$/.test(value) || value?.length === 12 && /^[0-9]{12}$/.test(value) ? undefined : 'Invalid NIC number';},
    },
  });

  const handleSubmit = (values : customerFormData) => {
    console.log(values);
  }

  return (
    <Box component="form" maw={400} mx="auto" onSubmit={form.onSubmit(() => {handleSubmit(form.values)})}>
      <TextInput label="Surname" placeholder="Surname" withAsterisk {...form.getInputProps('surname')} />
      <TextInput label="Name" placeholder="Name" withAsterisk {...form.getInputProps('name')} />
      <TextInput
        label="Your email"
        placeholder="Your email"
        withAsterisk
        mt="md"
        {...form.getInputProps('email')}
      />
      
      <NumberInput
        label="Your age"
        placeholder="Your age"
        withAsterisk
        mt="md"
        {...form.getInputProps('age')}
      />
      <Input.Wrapper id={id} label="Phone Number 1" required error = {form.errors.phoneNumber1}>
      <Input
        component={IMaskInput}
        mask="+94 00-000-0000"
        id={id}
        placeholder="Phone Number 1"
        {...form.getInputProps('phoneNumber1')}
      />
    </Input.Wrapper>
      <Input.Wrapper id={id} label="Phone Number 2" required error = {form.errors.phoneNumber2}>
      <Input
        component={IMaskInput}
        mask="+94 00-000-0000"
        id={id}
        placeholder="Phone Number 2"
        {...form.getInputProps('phoneNumber2')}
      />
    </Input.Wrapper>
    <DatePickerInput
      label="Pick date"
      placeholder="Pick date"
      withAsterisk
      {...form.getInputProps('dateofbirth')}
    />
    <TextInput label="nicNumber" placeholder="NIC number" withAsterisk {...form.getInputProps('nicNumber')} />
      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </Box>
  );
}

export default AddCustomersPage;