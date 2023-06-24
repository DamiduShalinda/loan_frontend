import { useEffect , useState } from "react"
import { API_ENDPOINTS } from "../api";
import axios from "axios";
import { Loader , Center ,Modal, Group} from "@mantine/core";
import { TableSort } from "../Components/TableSortLoans";
import { useDisclosure } from '@mantine/hooks';
import LoanView from "../Components/LoanView";

type loanDatatype = {
  loan_id: string;
  username: string;
  branch_location: string;
  loaned_amount: string;
  loaned_date: string;
}

function ViewAllLoans() {
      
  const [opened, { open, close }] = useDisclosure(false);
  const [ loansDetails , setLoanDetails ] = useState<loanDatatype[]>([])
  const [ loading , setLoading ] = useState<boolean>(true)
  const [ userId , setUserId ] = useState<number>()

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
    setLoading(false)
    //TODO:fetching twice
  }, [loansDetails])
  

  function handleSubmit(id: number) {
    open()
    setUserId(id)
  }

  
  return (
    <>
    {loading ? 
    <Center my='40vh'>
      <Loader variant='dots' size='xl'/> 
    </Center>
     :
    <div>
      <TableSort data ={loansDetails} onSubmit={handleSubmit} />
      <Modal opened={opened} onClose={close} title="Detailed Loan View" centered>
        {userId &&
        <LoanView id={userId}/>
        }
      </Modal>
    </div>
          }
    </>
  )
}

export default ViewAllLoans