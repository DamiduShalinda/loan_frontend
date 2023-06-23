import { useEffect , useState } from "react"
import { API_ENDPOINTS } from "../api";
import axios from "axios";
import { loanfieldValueswithString } from "./AddNewLoan";
import { Loader , Center } from "@mantine/core";
import { TableSort } from "../Components/TableSortLoans";
import { data } from "./tabledata";


function ViewAllLoans() {
      
  const [ loansDetails , setLoanDetails ] = useState<loanfieldValueswithString[]>([])
  const [ loading , setLoading ] = useState<boolean>(true)

  async function getLoans() {
    await axios.get(API_ENDPOINTS.getLoans)
    .then(res => {
      const tempdata: loanfieldValueswithString[] = []
      res.data.forEach((item: loanfieldValueswithString) => {
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
      <TableSort data ={data} />
    </div>
          }
    </>
  )
}

export default ViewAllLoans