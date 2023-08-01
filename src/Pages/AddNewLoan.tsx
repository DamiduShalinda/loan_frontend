import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Button, Box ,  Group , Autocomplete  ,Loader , Center, Text} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useState , useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { API_ENDPOINTS } from '../api';
import { notifications } from '@mantine/notifications';
import { IconCheck , IconX } from '@tabler/icons-react'; 


type basefieldValues = {
  branch_location: string;
  loaned_amount: number;
  bike_number: string;
  loan_period : number;
}

type fieldValues = basefieldValues & {
  loaned_date: Date;
  username: string;
  first_guarantor: string;
  second_guarantor: string;
}

type loanfieldValueswithString = basefieldValues & {
  loaned_date: string;
  username: number;
  first_guarantor: number;
  second_guarantor: number;
}

type customerDetails = {
  id: number;
  name: string;
}


function AddNewLoan() {

  const [usernames , setUsernames] = useState<string[]>([])
  const [ customerDetails , setCustomerDetails ] = useState<customerDetails[]>([])
  const [loading , setLoading] = useState<boolean>(true)

  async function getUserNames() {
    try {
      const res = await axios.get(API_ENDPOINTS.getCustomername);
      setCustomerDetails(res.data);
      const fetchData: string[] = res.data.map((item : customerDetails) => item.name);
      setUsernames(fetchData);
    } catch (error) {
      console.log(error);
    }
  }
  

  const getUserId = (name : string) => {
    let id = 0 
    customerDetails.forEach((item) => {
      if (item.name === name) {
        id = item.id
      }
    })
    return id
  }




  async function submitLoan(values: loanfieldValueswithString) {
    console.log(values);
    try {
      await axios.post(API_ENDPOINTS.addLoan , values)
      .then(res => {
        notifications.show({title: 'Loan Added Successfully' , color : 'green' , message : 'Loan Added Successfully' , icon : <IconCheck />})
        form.reset()
      })
    } catch (error) {
      console.log(error);
      notifications.show({title: 'Error' , color : 'red' , message : 'Error' , icon : <IconX />})
    }
  }

  useEffect(() => {
    getUserNames()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Set loading to false in case of an error as well
      });
  }, []);
  
  


  const form = useForm({
    initialValues: { 
      username: '', 
      branch_location: '',
      loaned_amount: 0,
      bike_number: '',
      first_guarantor: '',
      second_guarantor: '',
      loaned_date: new Date(),
      loan_period : 12
      //TODO : add input field for loan_period
    },

    // functions will be used to validate values at corresponding key
    validate: {
      username: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      branch_location: (value) => (value ? undefined : 'Branch Location is required'),
      loaned_amount: (value) => (value ? undefined : 'Amount is required'),
      first_guarantor: (value) => (value ? undefined : 'First Guarentee is required'),
      second_guarantor: (value) => (value ? undefined : 'Second Guarentee is required'),
      bike_number: (value) => (value ? undefined : 'Bike Number is required'),
      loaned_date: (value) => (value ? undefined : 'Date is required'),
    },
  });

  function handleSubmit(values: fieldValues) {
    const newValues: loanfieldValueswithString = {
      ...values,
      username: getUserId(values.username),
      first_guarantor: getUserId(values.first_guarantor),
      second_guarantor: getUserId(values.second_guarantor),
      loaned_date: values.loaned_date.toISOString().slice(0, 10)
    }

  submitLoan(newValues)
}

  return (
    <>
    {loading ? 
    <Center my='40vh'>
    <Loader variant='dots' size='xl'/> 
    </Center>

    : 
    <Box maw={500} mx="auto">
    <form onSubmit={form.onSubmit(() => {handleSubmit(form.values)})}>
      <Autocomplete
        mt="sm"
        placeholder="Customer's Branch"
        label="Customer's Branch"
        withAsterisk
        data={[ 'Polonnaruwa', 'Diyasenpura', 'Sewanapitiya', 'Dehiaththakandiya' , 'Mahiyanaganaya' ]}
        {...form.getInputProps('branch_location')}
      />
      <Autocomplete
        mt="sm"
        placeholder="Customer's Username"
        label="Customer's Username"
        withAsterisk
        data={usernames}
        {...form.getInputProps('username')}
      />
      <TextInput mt="sm" label="Bike Number" placeholder="Bike Number" {...form.getInputProps('bike_number')} withAsterisk />
      <NumberInput
        mt="sm"
        label="Loaned Value"
        placeholder="Loaned Value"
        min={0}
        hideControls
        withAsterisk
        required
        {...form.getInputProps('loaned_amount')}
      />
      <NumberInput
        mt="sm"
        label="Loan Period (Months)"
        placeholder="Loaned Period"
        min={0}
        hideControls
        withAsterisk
        required
        {...form.getInputProps('loan_period')}
      />
      <DatePickerInput mt="sm" label="Date" placeholder="Date" valueFormat="YYYY-MMM-DD" {...form.getInputProps('loaned_date')} withAsterisk />
      <Autocomplete
        mt="sm"
        placeholder="Customer's Branch"
        label="First Guarentee's Username"
        withAsterisk
        data={usernames}
        {...form.getInputProps('first_guarantor')}
      />
      <Autocomplete
        mt="sm"
        placeholder="Customer's Branch"
        label="Second Guarentee's Username"
        withAsterisk
        data={usernames}
        {...form.getInputProps('second_guarantor')}
      />
      <Group position='apart' mt={30}>
        <Text size='lg'>Required</Text>
      <Button type="submit" mt="sm">
        Submit
      </Button>
      </Group>
    </form>
  </Box>
    }
    </>
  );
}

export default AddNewLoan;

//TODO: add validation for bike number
//TODO: add loan number field