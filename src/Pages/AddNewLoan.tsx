import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Button, Box ,  Group , Autocomplete  ,Loader , Center} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useState , useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../api';


type basefieldValues = {
  username: string;
  branch_location: string;
  loaned_amount: number;
  bike_number: string;
  first_guarantor: string;
  second_guarantor: string;
}

type fieldValues = basefieldValues & {
  loaned_date: Date;
}

export type loanfieldValueswithString = basefieldValues & {
  loaned_date: string;
}

function AddNewLoan() {

  const [usernames , setUsernames] = useState<string[]>([])
  const [loading , setLoading] = useState<boolean>(true)

  async function getUserNames() {
    try {
      await axios.get(API_ENDPOINTS.getCustomername)
      .then(res => {
       const data = res.data
       const fetchData:string[] = [] 
       data.forEach((item) => {
        fetchData.push(item.username)
       });
        setUsernames(fetchData)
        })
    } catch (error) {
      console.log(error);
    }
  }

  async function submitLoan(values: loanfieldValueswithString) {
    try {
      await axios.post(API_ENDPOINTS.addLoan , values)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserNames()
  }, [])

  useEffect(() => {
    if (usernames.length > 0) {
      setLoading(false)
      //usernames updated two times , don't know why
    }
  }, [usernames])
  


  const form = useForm({
    initialValues: { 
      username: '', 
      branch_location: '',
      loaned_amount: 0,
      bike_number: '',
      first_guarantor: '',
      second_guarantor: '',
      loaned_date: new Date(),
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
      username: values.username,
      branch_location: values.branch_location,
      loaned_amount: values.loaned_amount,
      bike_number: values.bike_number,
      first_guarantor: values.first_guarantor,
      second_guarantor: values.second_guarantor,
      loaned_date: values.loaned_date.toISOString().slice(0,10)
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
        placeholder="Customer's Branch"
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
      <Group position='right'>
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