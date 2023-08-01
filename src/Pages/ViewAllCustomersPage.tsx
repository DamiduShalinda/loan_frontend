import axios from "axios"
import { TableViewAllCustomers } from "../Components/Tables/TableViewAllCustomers"
import { API_ENDPOINTS } from "../api"
import { useEffect, useState } from "react"
import { Loader } from "@mantine/core"
import { useNavigate } from "react-router-dom"


type customerData = {
  name: string,
  telephone1: string,
  nicnumber: string,
  loan_number: string,
  loan_id: string,
  customer_id: string,
}

type trimmedCustomerData = {
  name: string,
  telephone1: string,
  nicnumber: string,
  loan_number: string,
}



function ViewAllCustomersPage() {

  const [customers, setCustomers] = useState<customerData[]>([])
  const [trimmedCustomers, setTrimmedCustomers] = useState<trimmedCustomerData[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  async function getCustomers() {
    await axios.get(API_ENDPOINTS.getCustomers)
    .then((response) => {
      setCustomers(response.data)
      setTrimmedCustomers(response.data.map((customer: customerData) => {
        return {
          name: customer.name,
          telephone1: customer.telephone1,
          nicnumber: customer.nicnumber,
          loan_number: customer.loan_number,
        }
      }
      ))
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    getCustomers()
      .then(() => {
        setLoading(false)
      }
      )
  }, [])

  return (
    <div>
          {loading ? <Loader/> : 
          <TableViewAllCustomers 
              data={customers}
              onCustomerSelect={(id) => {navigate(`/customer/${id}`)}}
              onLoanSelect={(id) => {navigate(`/arrears/one/${id}`)}}
            />}
    </div>
  )
}

export default ViewAllCustomersPage