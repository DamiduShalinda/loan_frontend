import { useForm } from '@mantine/form';
import { Modal, TextInput, Button, Box, Group, PasswordInput, Checkbox, Divider , Autocomplete } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { API_ENDPOINTS } from '../api';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { notifications } from '@mantine/notifications';
import { IconCheck ,IconAlertCircle } from '@tabler/icons-react'; 

interface staffinterfacebasic {
  name: string;
  surname: string;
  email: string;
  address: string;
  telephone1: string;
  telephone2: string;
  nicnumber: string;
  is_collector: boolean;
  username: string;
  password: string;
  usertype: string;
  branch : string;
}

type ValidationFunction = (value: string) => string | undefined;

interface staffinterface  extends staffinterfacebasic{
  dateofbirth: Date;
}

interface staffinterfacestring  extends staffinterfacebasic{
  dateofbirth: string;
}


type userType = {
  username: string;
  user_id: number;
  is_manager: boolean;
}

function AddNewEmployee() {

  const [opened, { open, close }] = useDisclosure(false);
  const [ user , setUser ] = useState<userType>()
  

  const form = useForm<staffinterface>({
    initialValues: { 
      name: '', 
      surname: '',
      email: '', 
      address: '',
      telephone1: '',
      telephone2: '',
      dateofbirth: new Date(),
      nicnumber: '',
      is_collector: false,
      username: '',
      password: '',
      usertype: 'staff',
      branch : '',
    },


    
    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      telephone1: (value) => (value.length < 10 ? 'Telephone number must have at least 10 numbers' : null),
      telephone2: (value) => (value.length < 10 ? 'Telephone number must have at least 10 numbers' : null),
      nicnumber : (value) => {return value?.length === 10 && /^[0-9]{9}[vV]$/.test(value) || value?.length === 12 && /^[0-9]{12}$/.test(value) ? undefined : 'Invalid NIC number';},
      username: (value) => (value ? undefined : 'Username is required'),
      password: (value) => (value ? undefined : 'Password is required'),
      address: (value) => (value ? undefined : 'Address is required'),
      branch : (value) => (value ? undefined : 'Branch is required'),
      surname: (value) => (value ? undefined : 'Surname is required'),
      dateofbirth: (value) => (value ? undefined : 'Date of birth is required'),
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



function handlemainformsubmit(): void {
  const updatedFormValues : staffinterfacestring = {
    ...form.values ,
    dateofbirth : form.values.dateofbirth.toISOString().split('T')[0]
  }
  axios.post(API_ENDPOINTS.addStaff, updatedFormValues)
    .then(res => {
      console.log(res.status)
      if (res.status == 201) {
        notifications.show({title : 'Success' , message : 'Staff member added successfully' , color : 'green' , autoClose : 5000 , icon : <IconCheck/> })
        form.reset()
      }else {
        notifications.show({title : 'Error' , message : 'Something went wrong' , color : 'red' , autoClose : 5000 , icon : <IconAlertCircle/> })

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
      <form onSubmit={form.onSubmit(handlemainformsubmit)}>
        <TextInput mt="md" label="Name" placeholder="Name" {...form.getInputProps('name')} withAsterisk />
        <TextInput mt="md" label="Surname" placeholder="Surname" {...form.getInputProps('surname')} withAsterisk />
        <TextInput mt="md" label="Email" placeholder="Email" {...form.getInputProps('email')}  withAsterisk/>
        <Autocomplete
          label=" Assigned Branch"
          placeholder="Pick one"
          mt="md"
          withAsterisk
          data={['Sewanapitiya', 'Polonnaruwa', 'Hingurakgoda', 'Diyasenpura' , 'Dehiaththakandiya' , 'Mahiyanganaya']}
          {...form.getInputProps('branch')}
        />
        <TextInput mt="md" label="Address" placeholder="Address" {...form.getInputProps('address')}  withAsterisk/>
        <TextInput mt="md" label="Telephone 1" placeholder="Telephone 1" {...form.getInputProps('telephone1')} withAsterisk />
        <TextInput mt="md" label="Telephone 2" placeholder="Telephone 2" {...form.getInputProps('telephone2')}  withAsterisk/>
        <DatePickerInput
            label="Date of birth"
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
            mt="xl"
            {...form.getInputProps('is_collector')}
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