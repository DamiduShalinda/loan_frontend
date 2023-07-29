import axios from 'axios'
import { API_ENDPOINTS } from '../api'
import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form';
import {  Button , Box, Autocomplete    ,LoadingOverlay, Group, Space , Text, Center} from '@mantine/core';

export type userDatatype = {
  name: string ,
  id: number ,
}

export type loanNumbertype = {
  loan_id: number ,
  username: userDatatype ,
  loan_amount: number ,
  loan_number: string ,
}

type formValues = {
  username: string ,
  loan_number: string ,
}

type Inputprops = {
    onSubmit: (id : number) => void;
    onClickPayment: () => void;
}

function HomepageInputs( {onSubmit , onClickPayment} : Inputprops ) {

  const [ loading , setLoading ] = useState<boolean>(true)
  const [ loanNumbers , setLoanNumbers ] = useState<loanNumbertype[]>([])
  const [ usernames , setUsernames ] = useState<string[]>([])
  const [ loan_numbers , setLoan_numbers ] = useState<string[]>([])
  const [ loanID , setloanId] = useState<number>()
  const [ haveId , setHaveId] = useState<boolean>(false)

  const form = useForm({
    initialValues: { username: '', loan_number: '' },

  });

  
  
async function getLoanNumbers() {
  await axios.get(API_ENDPOINTS.getAllLoans)
  .then(res => {
    const tempdata: loanNumbertype[] = []
    res.data.forEach((item: loanNumbertype) => {
      tempdata.push(item)
    }
    )
    setLoanNumbers(tempdata)
    
  })
}
  useEffect(() => {
    getLoanNumbers()
  }, [loanNumbers.length])
  
  useEffect(() => {
    if(loanNumbers.length > 0){
      const uniqueUsernames: string[] = Array.from(new Set(loanNumbers.map(item => item.username.name)));
      const uniqueLoanNumber: string[] = Array.from(new Set(loanNumbers.map(item => item.loan_number)));
  
      // Update state with unique values
      setUsernames(uniqueUsernames);
      setLoan_numbers(uniqueLoanNumber);
    
    setLoading(false)
  }
    //TODO:fetching twice
  }, [loanNumbers.length])


  function findbyUsername(username: string) {
    const loan = loanNumbers.find(item => item.username.name === username)
    if(loan)
    setloanId(loan.loan_id)
  }

  function findbyLoanNumber(loan_number: string) {
    const loan = loanNumbers.find(item => item.loan_number === loan_number)
    if(loan)
    setloanId(loan.loan_id)
  }

  function handleSubmit(values : formValues) {

    if(values.username !== '')
      findbyUsername(values.username)
    if(values.loan_number !== '')
      findbyLoanNumber(values.loan_number)
  }

  function handleClickPayment() {
    onClickPayment()
  }

  useEffect(() => {
    async function submitForm() {
      if (loanID) {
        onSubmit(loanID);
        form.reset();
        setHaveId(true)
      }
    }

    submitForm();
  }, [loanID]);

  return (
    <>
      {loading ? <LoadingOverlay visible={loading}/> :
      
        <Box maw={320} mx="auto" my="20%">
          <Text>Enter Customers Name or Loan ID for a Payment</Text>
          <form onSubmit={form.onSubmit(handleSubmit)}>
        <Autocomplete
          mt='xl'
          label="Customers username"
          placeholder="Username"
          data={usernames}
          {...form.getInputProps('username')}
        />
        <Autocomplete
          mt='xl' 
          label="Customers loan number"
          placeholder="Loan number"
          data={loan_numbers}
          {...form.getInputProps('loan_number')}
        />
        
        <Center><Button type="submit" mt="xl">
          Search
        </Button></Center>
        <Space h="4vh"/>
        { haveId && 
        <Group><Button  color='green' radius='sm' w='110vh' h='8vh' onClick={handleClickPayment}>
          <Text size={'md'}>Proceed to a Payment</Text>
        </Button>
        </Group>}
        
      </form>
    </Box>
    }
    </>
  )
}

export default HomepageInputs
