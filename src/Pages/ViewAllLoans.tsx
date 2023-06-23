import { useEffect , useState } from "react"
import { API_ENDPOINTS } from "../api";
import axios from "axios";
import { Loader , Center } from "@mantine/core";
import { TableSort } from "../Components/TableSortLoans";


type loanDatatype = {
  username: string;
  branch_location: string;
  loaned_amount: string;
  loaned_date: string;
}

function ViewAllLoans() {
      
  const [ loansDetails , setLoanDetails ] = useState<loanDatatype[]>([])
  const [ loading , setLoading ] = useState<boolean>(true)

  async function getLoans() {
    await axios.get(API_ENDPOINTS.getLoans)
    .then(res => {
      const tempdata: loanDatatype[] = []
      res.data.forEach((item: loanDatatype) => {
        tempdata.push(item)
      })
      setLoanDetails(tempdata)
    }
    )
  }

  useEffect(() => {
   getLoans()

  }, [])

  useEffect(() => {
    if(loansDetails.length > 0)
    console.log(loansDetails);
    setLoading(false)
    //fetching twice
  }, [loansDetails])
  


  
  return (
    <>
    {loading ? 
    <Center my='40vh'>
      <Loader variant='dots' size='xl'/> 
    </Center>
     :
    <div>
      <TableSort data ={loansDetails} />
    </div>
          }
    </>
  )
}

export default ViewAllLoans