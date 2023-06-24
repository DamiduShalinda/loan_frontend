import axios from 'axios'
import { API_ENDPOINTS } from '../api'
import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form';
import {  Button , Box, Grid ,Autocomplete  } from '@mantine/core';


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

function Homepage() {

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
      console.log(usernames)
      console.log(loan_numbers)
      console.log(loanNumbers)
    
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

    console.log(loanID)
  }

  return (
    <>
    <Grid>
      <Grid.Col span={6}>

      </Grid.Col>
      <Grid.Col span={6}>
        <Box
         sx={(theme) => ({
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          textAlign: 'left',
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          cursor: 'pointer',
          border: theme.colorScheme === 'dark' ? `1px solid ${theme.colors.gray[7]}` : `1px solid ${theme.colors.gray[3]}`,
          width: '80%',
          height: '80vh',
          margin: 'auto',
  
          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
          },
        })}
        >
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
        </Box>
      </Grid.Col>
    </Grid>
    </>
  )
}

export default Homepage