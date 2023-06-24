import axios, { AxiosResponse } from "axios";
import { API_ENDPOINTS } from "../api";
import { useEffect, useState } from "react";
import { Box, Button, Group, List , Title , Modal} from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import PaymentInputs from "./PaymentInputs";

type HomepageLoanDetailsProps = {
    id : number;
}

type loanDatatype = {
    loan_id: string;
    username: string;
    branch_location: string;
    loaned_amount: number;
    loaned_date: string;
    bike_number: string;
    first_guarantor: string;
    second_guarantor: string;
    loan_number: string;
    }

function HomepageLoanDetails( {id} : HomepageLoanDetailsProps) {

    const [loanDetails , setLoanDetails] = useState<loanDatatype>()
    const [opened, { open, close }] = useDisclosure(false);

    async function getMoreDetails() {
        try {
            await axios.get(API_ENDPOINTS.getMoreDetails(id))
            .then((res : AxiosResponse<loanDatatype>) => {
                setLoanDetails(res.data)
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMoreDetails()
    }, [])
    
  return (
    <div>
        <Box mx="lg" mt={"xl"} maw={300}>
        <Title order={1}>{loanDetails?.loan_number}</Title>
        <List withPadding  mt="15%">
            <List.Item mb={"md"}>Username : {loanDetails?.username}</List.Item>
            <List.Item mb={"md"}>Branch Location : {loanDetails?.branch_location}</List.Item>
            <List.Item mb={"md"}>Loaned Amount : {loanDetails?.loaned_amount}</List.Item>
            <List.Item mb={"md"}>Loan Details : {loanDetails?.loaned_date}</List.Item>
            <List.Item>Bike Number : {loanDetails?.bike_number}</List.Item>
        </List>
        <Modal opened={opened} onClose={close} title="Make a Payment" >
        <PaymentInputs id={id}/>
      </Modal>
        <Group position="left" mt="xl">
            <Button variant="filled" color="blue" onClick={open}>Make a Payment</Button>
            </Group>
        </Box>
    </div>
  )
}

export default HomepageLoanDetails