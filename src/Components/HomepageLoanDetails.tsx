import axios, { AxiosResponse } from "axios";
import { API_ENDPOINTS } from "../api";
import { useEffect, useState } from "react";
import { Box, Button, Group, List , Title , Card , Avatar, Center, Grid} from "@mantine/core";
import { Link } from "react-router-dom";

type HomepageLoanDetailsProps = {
    id : number;
}

type loanDatatype = {
    loan_number : string;
    loan_id : number;
    customer_id : number;
    customer_name : string;
    customer_image : string;
    last_payment_amount : number;
    last_payment_date : string;
    monthly_payment : number;
    }

function HomepageLoanDetails( {id} : HomepageLoanDetailsProps) {

    const [loanDetails , setLoanDetails] = useState<loanDatatype>()

    async function getMoreDetails() {
        try {
            await axios.get(API_ENDPOINTS.getHomeData(id))
            .then((res : AxiosResponse<loanDatatype>) => {
                setLoanDetails(res.data)
                console.log(res.data);
                console.log(res.data.customer_image);
                console.log(loanDetails?.customer_image);

            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMoreDetails()
    }, [id])
    
  return (
    <div>
        {loanDetails && 
        <Center>
        <Box mx="lg" w={500}>
        <Card shadow="sm" radius={"md"} withBorder my={"xl"}>
        <Center><Title order={1} size='7vh'>{loanDetails.loan_number}</Title></Center>
            <Card.Section>
                <Center><Avatar src={loanDetails.customer_image} radius="100vh" size="18vh" alt="customer image" m={"xl"} /></Center>
            </Card.Section>
            <List m={"xl"}>
                <List.Item m={"md"}><b>Customer Name : </b>{loanDetails.customer_name}</List.Item>
                <List.Item m={"md"}><b>Monthly Payment : </b>{loanDetails.monthly_payment}</List.Item>
                <List.Item m={"md"}><b>Last Payment Amount : </b>{loanDetails.last_payment_amount}</List.Item>
                <List.Item m={"md"}><b>Last Payment Date : </b>{loanDetails.last_payment_date}</List.Item>
                
            </List>
            <Grid>
                <Grid.Col span={6}>
                    <Group position="left" mt="xl">
                        <Link  to={`/arrears/one/${loanDetails.loan_id}`}>
                            <Button variant="filled" color="blue" >View More Loan Details</Button>
                        </Link>
                    </Group>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Group position="right" mt="xl">
                        <Link to={`/customer/${loanDetails.customer_id}`}>
                        <Button variant="filled" color="gray">View Customer Details</Button>
                        </Link>
                    </Group>
                </Grid.Col>
            </Grid>
        </Card>
        
        </Box>
        </Center>
        }
    </div>
  )
}

export default HomepageLoanDetails