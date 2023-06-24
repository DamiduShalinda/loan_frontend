import axios from 'axios'
import { API_ENDPOINTS } from '../api'
import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form';
import {  Button , Box, Autocomplete  } from '@mantine/core';


type loanNumbertype = {
  loan_id: number ,
  username: string ,
  loan_amount: number ,
  loan_number: string ,
}

type formValues = {
  username: string ,
  loan_number: string ,
}

type Inputprops = {
    onSubmit: (id : number) => void;
}

function HomepageInputs( {onSubmit} : Inputprops ) {

  const [ loading , setLoading ] = useState<boolean>(true)
  const [ loanNumbers , setLoanNumbers ] = useState<loanNumbertype[]>([])
  const [ usernames , setUsernames ] = useState<string[]>([])
  const [ loan_numbers , setLoan_numbers ] = useState<string[]>([])
  const [ loanID , setloanId] = useState<number>()

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

  }, [])
  
  useEffect(() => {
    if(loanNumbers.length > 0){
      const uniqueUsernames: string[] = Array.from(new Set(loanNumbers.map(item => item.username)));
      const uniqueLoanNumber: string[] = Array.from(new Set(loanNumbers.map(item => item.loan_number)));
  
      // Update state with unique values
      setUsernames(uniqueUsernames);
      setLoan_numbers(uniqueLoanNumber);
    
    setLoading(false)}
    //TODO:fetching twice
  }, [loanNumbers])


  function findbyUsername(username: string) {
    const loan = loanNumbers.find(item => item.username === username)
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

    if(loanID)
        onSubmit(loanID)
  }

  return (
    <>
    
        <Box maw={320} mx="auto" my="20%">
          <form onSubmit={form.onSubmit(() => {handleSubmit(form.values)})}>
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
        
        <Button type="submit" mt="xl">
          Search
        </Button>
      </form>
    </Box>
    </>
  )
}

export default HomepageInputs

