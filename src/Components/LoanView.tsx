import axios  from "axios"
import { API_ENDPOINTS } from "../api"
import { useEffect, useState } from "react"
import { AxiosResponse } from "axios"
import { List , Group, Button} from "@mantine/core"
import { Link } from "react-router-dom"
import LoanPayments from "./LoanPayments"

interface Props {
  id: number
}

interface loanDetails {
  loan_id: number;
  username: string;
  branch_location: string;
  loaned_amount: number;
  loaned_date: string;
  first_guarantor: string;
  second_guarantor: string;
}


function LoanView({ id }: Props) {

  const [ loanDetails , setLoanDetails ] = useState<loanDetails>()
  const [ viewpayment , setViewPayment ] = useState<boolean>(false)

  async function getLoanDetails(id: number) {
  
    await axios.get<loanDetails>(API_ENDPOINTS.getMoreDetails(id))
    .then((res : AxiosResponse<loanDetails>) => {
      setLoanDetails(res.data)
    }
    )
  }

  useEffect(() => {
    getLoanDetails(id)
  }, [id])

  function handleViewPayment() {
    setViewPayment(true)
  }
  
  return (
    <>
    {!viewpayment ? <>{loanDetails &&
    <List withPadding mt="md">
            <List.Item>Loan ID: {loanDetails.loan_id}</List.Item>
            <List.Item>Username: {loanDetails.username}</List.Item>
            <List.Item>Branch Location: {loanDetails.branch_location}</List.Item>
            <List.Item>Loaned Amount: {loanDetails.loaned_amount}</List.Item>
            <List.Item>Loaned Date: {loanDetails.loaned_date}</List.Item>
            <List.Item>First Guarantor: {loanDetails.first_guarantor}</List.Item>
            <List.Item>Second Guarantor: {loanDetails.second_guarantor}</List.Item>
            <Group position="right" mt="lg">
              <Button color="blue" variant="filled" onClick={handleViewPayment}>Payment Details</Button>
            </Group>
    </List>
     } </> : <LoanPayments id={id}/>}
    </>
  )
}

export default LoanView

//TODO: add customer detaiis to the api