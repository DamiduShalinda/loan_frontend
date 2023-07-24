import { useForm } from '@mantine/form';
import { Modal, TextInput, Button, Box, Group, PasswordInput, Checkbox, Divider } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { API_ENDPOINTS } from '../api';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';

interface staffinterface {
  name: string;
  email: string;
  addess: string;
  telephone1: string;
  telephone2: string;
  dateofbirth: Date;
  nicnumber: string;
  is_collector: boolean;
  username: string;
  password: string;
  usertype: string;
}

type userType = {
  username: string;
  user_id: number;
  is_manager: boolean;
}

function AddNewEmployee() {

  const [opened, { open, close }] = useDisclosure(true);
  const [ user , setUser ] = useState<userType>()
  const form = useForm<staffinterface>({
    initialValues: { 
      name: '', 
      email: '', 
      addess: '',
      telephone1: '',
      telephone2: '',
      dateofbirth: new Date(),
      nicnumber: '',
      is_collector: false,
      username: '',
      password: '',
      usertype: 'staff',
    },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const authform = useForm({
    initialValues: {
        username: '',
        password: '',
    },
});

function handleSubmitValidation(): void {
  axios.post(API_ENDPOINTS.getUser, form.values)
   .then(res => {
       if (res.status == 200) {
           setUser(jwtDecode(res.data.access))
           if (user?.is_manager == true) {
               close()
           }
       }else {
           console.log("error")
       }
   })
}

  return (
    <>
      <Modal opened={opened} withCloseButton={false}  onClose={close} title="Authentication" centered closeOnClickOutside={false}>
      <form onSubmit={authform.onSubmit(handleSubmitValidation)}>
    <Divider mt="xl" label="Enter password of a collector" labelPosition='center'/>
     <TextInput
        placeholder="username"
        label="Full name"
        withAsterisk
        mt={'md'}
        {...form.getInputProps('username')}
    />
    <PasswordInput
        placeholder="Password"
        label="Password"
        withAsterisk
        mt={'md'}
        {...form.getInputProps('password')}
    />
    <Group position='right' mt='xl'>
        <Button 
            type='submit' 
            variant='outline'
                >Submit User</Button>
    </Group>
    </form>
      </Modal>
      <Box maw='35%' mx="auto">
      <form onSubmit={form.onSubmit(console.log)}>
        <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} withAsterisk />
        <TextInput mt="md" label="Email" placeholder="Email" {...form.getInputProps('email')}  withAsterisk/>
        <TextInput mt="md" label="Address" placeholder="Address" {...form.getInputProps('address')}  withAsterisk/>
        <TextInput mt="md" label="Telephone 1" placeholder="Telephone 1" {...form.getInputProps('telephone1')} withAsterisk />
        <TextInput mt="md" label="Telephone 2" placeholder="Telephone 2" {...form.getInputProps('telephone2')}  withAsterisk/>
        <DatePickerInput
            label="Pick date"
            placeholder="Pick date"
            mx="auto"
            mt="md"
            withAsterisk
            {...form.getInputProps('dateofbirth')}
            />
        <TextInput mt="md" label="NIC Number" placeholder="NIC Number" {...form.getInputProps('nicnumber')}  withAsterisk/>
        <TextInput mt="md" label="Username" placeholder="Username" {...form.getInputProps('username')}  withAsterisk/>
        <PasswordInput mt="md" label="Password" placeholder="Password" {...form.getInputProps('password')}  withAsterisk/>
        <Checkbox
            label="Employee is a collector"
            radius="xs"
            size="sm"
            mt="md"
          />
        <Group position='right'>
          <Button type="submit" mt="md">
            Submit
          </Button>
        </Group>
      </form>
    </Box>
    </>
  )
}

export default AddNewEmployee