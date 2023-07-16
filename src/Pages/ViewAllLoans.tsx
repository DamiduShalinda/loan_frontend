import { useEffect , useState } from "react"
import { API_ENDPOINTS } from "../api";
import axios from "axios";
import { Loader , Center ,Modal} from "@mantine/core";
import { TableSort } from "../Components/Tables/TableSortLoans";
import { useDisclosure } from '@mantine/hooks';
import LoanView from "../Components/LoanView";
import { userDatatype } from "../Components/HomePageInputs";

type loanDatatypefromAPI = {
  loan_id: string;
  username: userDatatype;
  branch_location: string;
  loaned_amount: string;
  loaned_date: string;
}

type loanDatatype = {
  loan_id: string;
  username: string ;
  branch_location: string;
  loaned_amount: string;
  loaned_date: string;
}

function ViewAllLoans() {
      
  const [opened, { open, close }] = useDisclosure(false);
  const [ loansDetails , setLoanDetails ] = useState<loanDatatype[]>([])
  const [ loading , setLoading ] = useState<boolean>(true)
  const [ userId , setUserId ] = useState<number>()

  
  useEffect(() => {
    getLoans()
    async function getLoans() {
      await axios.get(API_ENDPOINTS.getLoans)
      .then(res => {
        const tempdata: loanDatatype[] = []
        res.data.forEach((item: loanDatatypefromAPI) => {
          const loanData: loanDatatype = {
            loan_id: item.loan_id,
            username: item.username.name,
            branch_location: item.branch_location,
            loaned_amount: item.loaned_amount,
            loaned_date: item.loaned_date
          }
          tempdata.push(loanData)
        })
        setLoanDetails(tempdata)
      }
      )
    }

  }, [])

  useEffect(() => {
    if(loansDetails.length > 0)
    setLoading(false)
    console.log(loansDetails)
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
      <Modal opened={opened} onClose={close} title="Detailed Loan View" centered size="55%">
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