import { useForm,  isEmail, hasLength } from '@mantine/form';
import { Button, Group, TextInput, Box , Input , PasswordInput, Stack } from '@mantine/core';
import { useId , useDisclosure } from '@mantine/hooks';
import { IMaskInput } from 'react-imask';
import { DatePickerInput } from '@mantine/dates';
import axios from 'axios';
import { API_ENDPOINTS } from '../api';

export interface customerFormData {
  surname: string;
  name: string;
  email: string;
  dateofbirth: Date;
  telephone1: string;
  telephone2: string;
  nicnumber: string;
  username: string;
  password: string;
  address: string;
}

function AddCustomersPage() {
  const id = useId();
  const [visible, { toggle }] = useDisclosure(false);

  const isUsernameValid = (value : string) => {
    if (!/^[a-z]+$/.test(value)) {
      return 'Username must contain only lowercase letters without spaces or special characters';
    }
    
    if (value.length < 2 || value.length > 10) {
      return 'Username must be between 2 and 10 characters long';
    }
    
    return undefined;
  };

  const form = useForm<customerFormData>({
    initialValues: {
      surname: '',
      name: '',
      email: '',
      dateofbirth: new Date(),
      telephone1: '',
      telephone2: '',
      nicnumber: '',
      username: '',
      password: '',
      address: '',
    },

    validate: {
      surname: hasLength({ min: 2, max: 10 }, 'Name must be 2-10 characters long'),
      name: hasLength({ min: 2, max: 10 }, 'Name must be 2-10 characters long'),
      email: isEmail('Invalid email'),
      telephone1: hasLength(15, 'Phone number must be 10 characters long'),
      telephone2: hasLength(15, 'Phone number must be 10 characters long'),
      nicnumber : (value) => {return value?.length === 10 && /^[0-9]{9}[vV]$/.test(value) || value?.length === 12 && /^[0-9]{12}$/.test(value) ? undefined : 'Invalid NIC number';},
      username: (value) => {return isUsernameValid(value)},
      password: (value) => (value ? undefined : 'Password is required'),
      address: hasLength({ min: 2, max: 100 }, 'Address must be 2-100 characters long'),

    },
  });

  const handleSubmit = (values : customerFormData) => {
    console.log(values);
    axios.post(API_ENDPOINTS.addCustomer, values)
    .then(res => {
        console.log(res.data);
        form.reset();
    });
  }

  return (
    <Box component="form" maw='75vh' mx="auto" onSubmit={form.onSubmit(() => {handleSubmit(form.values)})}>
      <TextInput label="Surname" placeholder="Surname" withAsterisk {...form.getInputProps('surname')} />
      <TextInput label="Name" placeholder="Name" withAsterisk {...form.getInputProps('name')} />
      <TextInput label="Address" placeholder="Name" withAsterisk {...form.getInputProps('address')} />
      <TextInput
        label="Your email"
        placeholder="Your email"
        withAsterisk
        mt="md"
        {...form.getInputProps('email')}
      />
      <Input.Wrapper id={id} label="Phone Number 1" required error = {form.errors.telephone1}>
      <Input
        component={IMaskInput}
        mask="+94 00-000-0000"
        id={id}
        placeholder="Phone Number 1"
        {...form.getInputProps('telephone1')}
      />
    </Input.Wrapper>
      <Input.Wrapper id={id} label="Phone Number 2" required error = {form.errors.telephone2}>
      <Input
        component={IMaskInput}
        mask="+94 00-000-0000"
        id={id}
        placeholder="Phone Number 2"
        {...form.getInputProps('telephone2')}
      />
    </Input.Wrapper>
    <DatePickerInput
      label="Date of Birth"
      placeholder="Pick date"
      withAsterisk
      {...form.getInputProps('dateofbirth')}
    />
    <TextInput label="NIC number" placeholder="NIC number" withAsterisk {...form.getInputProps('nicnumber')} />
    <TextInput label="Username" placeholder="Username" withAsterisk {...form.getInputProps('username')} />
      <PasswordInput
        label="Password"
        withAsterisk
        defaultValue="secret"
        visible={visible}
        onVisibilityChange={toggle}
        {...form.getInputProps('password')}
      />

      <Group position="right" mt="md">
        <Button type="submit" >Submit</Button>
      </Group>
    

    </Box>
  );
}

export default AddCustomersPage;