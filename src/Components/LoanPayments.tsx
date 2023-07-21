import axios from "axios";
import { API_ENDPOINTS } from "../api";
import { useEffect, useState } from "react";
import { TableScrollArea } from "./Tables/Table";
import { Button, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


export interface formValues {
  payment_amount: number;
  payment_date: string;
  interest : number;
  principle : number;
  balance : number;
  loan_number: string;
  id : number;
}
  

function LoanPayments() {

  const [ paymentValues , setPaymentValues ] = useState<formValues[]>([])
  const [ loading , setLoading ] = useState<boolean>(true)
  const { id } = useParams<{id : string}>()
  const loanid = Number(id)
  
  async function getPayments(id : number) {
    try {
      await axios.get(API_ENDPOINTS.getAllpayments(id))
      .then(res => {
        console.log(res.data);
        const tempdata: formValues[] = []
        res.data.forEach((item: formValues) => {
          tempdata.push(item)
        }
        )
        setPaymentValues(tempdata)
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
   
    getPayments(loanid)
  }, [])
  
  useEffect(() => {
    if(paymentValues.length > 0){
      console.log(paymentValues);
      setLoading(false)
    }
  }, [paymentValues])
  
  //TODO : Principal is not getting
  return (
    <div>
      {loading || !id? <div>Loading...</div> :
      <div>
        <TableScrollArea data={paymentValues} headers={['payment_amount' , 'payment_date' , 'interest' , 'principal' , 'balance']}/>
        <Group position="right">
          <Link to={`/arrears/one/${loanid}`}>
          <Button>Arrears</Button>
          </Link>
        </Group>
      </div>
      }
    </div>
  )
}

export default LoanPayments