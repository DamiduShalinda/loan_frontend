import React, { useEffect } from 'react';
import { Paper, Text, Group, Divider, Container, Space, Loader, Stack, Grid, List } from '@mantine/core';
import Logo from '../assets/svg/Logo';
import axios from 'axios';
import { API_ENDPOINTS } from '../api';



export type InvoiceParams = {
    payment_amount: string;
    payment_date: string;
    loan_number: string;
}

type Customer = {
    id: number;
    name: string;
    address: string;
}



const Invoice: React.FC<InvoiceParams> = ({payment_amount , payment_date , loan_number}) => {

    const [customer, setCustomer] = React.useState<Customer>();
    const [loannumber, setLoanNumber] = React.useState<string>();
    const [ loading  , setLoading] = React.useState<boolean>(true);


     async function getMoreLoanDetails(id: number) {
         try {
           await axios.get(API_ENDPOINTS.getMoreDetails(id))
            .then((response) => {
                const data: number = response.data.username;
                setLoanNumber(response.data.loan_number);
                getOneCustomerDetails(data);
            }
            )
         } catch (error) {
             console.log(error);
         }
    }

    async function getOneCustomerDetails(id:number) {
        try {
            axios.get(API_ENDPOINTS.getOneCustomer(id))
            .then((response) => {
                setCustomer(response.data);
            }
            )
        } catch (error) {
            console.log(error);
        }
    }
        
    

   useEffect(() => {
    if (loan_number !== undefined) {
        getMoreLoanDetails(parseInt(loan_number));
    }
   }, [])

   useEffect(() => {
    if (customer !== undefined) {
        setLoading(false);
    }
   }, [customer])
   
   
    

  return (
    <>
    {loading ? <Loader variant='bars'/> : 

    <Container size="lg">
      <Paper shadow="xs" style={{ padding: 20, marginBottom: 20 }}>
       <Space h="1vh" />
       <Grid>
        <Grid.Col span={3} my='auto'>
        <Logo size={150} color={'Black'} />
        </Grid.Col>
        <Grid.Col span={9}  my='auto'>
        <Text size='200%' weight={700} underline align='center'>Hasaru Enterprises</Text>
        </Grid.Col>
        </Grid>
       <Grid>
        <Grid.Col span={12}>
        <Stack spacing={'xs'}>
            <Text size={70} weight={700}>
                INVOICE
            </Text>
            <Text size={15} weight={400}>
                INVOICE NO:
            </Text>
            <Text size="sm" weight={400}>
                 {payment_date}
            </Text>
        </Stack>
        </Grid.Col>
        <Grid.Col span={12}><Space h="2vh" /></Grid.Col>
        <Grid.Col span={12}><Space h="3vh" /></Grid.Col>
        <Grid.Col span={6}>
                    <Stack spacing={'xs'}>
                        <Text size="sm" weight={700}>
                            Loan Number
                        </Text>
                        <Text size="sm" weight={400}>
                            {loannumber}
                        </Text>
                    </Stack>
                </Grid.Col>
        <Grid.Col span={6}>
            <Group position='right'>
                <Stack spacing={'xs'}>
                    <Text size="lg" weight={700} align='right'>
                        {customer?.name}
                    </Text>
                    <Text size="md" weight={400} align='right'>
                        {customer?.address}
                    </Text>
                    <Text size="md" weight={400} align='right'>
                        damidu@gmail.com
                    </Text>
                </Stack>
            </Group>
        </Grid.Col>
         </Grid>
            <Space h="3vh" />
         <Divider variant="dashed" />
            <Space h="3vh" />
            <Grid>
                
                <Grid.Col span={6}>
                    <Stack spacing={'xs'}>
                        <Text size="md" weight={700}>
                            Paid Amount
                        </Text>
                    </Stack>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Group position="right">
                    <Stack spacing={'xs'}>
                        <Text size="md" weight={700}>
                           LKR {payment_amount}
                        </Text>
                    </Stack>
                    </Group>
                </Grid.Col>
            </Grid>
            <Space h="3vh" />
            <Divider variant="dashed" />
            <Space h="3vh" />
            <Grid>
                <Grid.Col span={6}>
                    <Stack spacing={'xs'}>
                        <Text size="lg" weight={700}>
                            Thank you for your business !!!
                        </Text>
                        <Space h="1vh" />
                        <Text size="sm" weight={700}>
                            ...............................................
                        </Text>
                        <Text size="sm" weight={500}>
                            Authorized Signature
                        </Text>
                    </Stack>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Group position="right">
                    <Stack spacing={'xs'}>
                    <List>
                        <List.Item><Text size="sm" weight={500}>Sewanapitiya: 123-456-7890</Text></List.Item>
                        <List.Item><Text size="sm" weight={500}>Polonnaruwa: 987-654-3210</Text></List.Item>
                        <List.Item><Text size="sm" weight={500}>Dehiattakandiya: 456-789-0123</Text></List.Item>
                        <List.Item><Text size="sm" weight={500}>DiyasenPura: 789-012-3456</Text></List.Item>
                        <List.Item><Text size="sm" weight={500}>Mahiyanganaya: 675-098-5676</Text></List.Item>
                    </List>
                    </Stack>
                    </Group>
                </Grid.Col>
            </Grid>
      </Paper>
    </Container>
    }
    </>
  );
};

export default Invoice;
