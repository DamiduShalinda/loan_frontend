import { useEffect, useState } from "react"
import { loanArrearsInterface,  loanArrearsSubmitInterfacewitString } from "./ViewLoanArrears"
import axios from "axios"
import { API_ENDPOINTS } from "../api"
import { Loader  , Drawer} from "@mantine/core"
import { TableAllLoanArrears } from "../Components/Tables/TableAllLoanArrears"
import { loanNumbertype } from "../Components/HomePageInputs"
import { useDisclosure } from "@mantine/hooks"
import SearchComponents from "../Components/SearchComponentsDrawer"

interface trimmedArrearsInterface {
  id: string;
  loan_id : string;
  monthly_payment : string;
  monthly_arrears : string;
  arr_cal_date : string;

}

function ViewAllArrears() {

  const [ loading, setLoading ] = useState<boolean>(true)
  const [ allarrears, setAllArrears ] = useState<trimmedArrearsInterface[]>([])
  const [ loanid , setloanId] = useState<number[]>()
  const today = new Date()
  const currentDate = today.toISOString().split('T')[0]
  const [opened, { open, close }] = useDisclosure(false);
  
  
  async function getAllArrears() {
    await axios.get(API_ENDPOINTS.getAllArrears)
    .then(res => {
      const tempdata: loanArrearsInterface[] = []
      res.data.forEach((item: loanArrearsInterface) => {
        tempdata.push(item)
      }
      )
      setAllArrears(trimLoanArrears(tempdata))
      console.log(trimLoanArrears(tempdata))
    })
  }

  useEffect(() => {
    getAllArrears()
  }, [])

  useEffect(() => {
    setLoading(false)
    console.log(allarrears)
  }, [allarrears])
  
  
  async function getAllNumbers() {
    await axios.get(API_ENDPOINTS.getAllLoans)
    .then(res => {
      const tempdata: number[] = []
      res.data.forEach((item: loanNumbertype) => {
        tempdata.push(item.loan_id)
      }
      )
      setloanId(tempdata)
    })
  }

  async function findLoanIDByNumber(loanNumber : string) {
    try {
      const response = await axios.get(API_ENDPOINTS.getAllLoans);
      return new Promise((resolve) => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].loan_number === loanNumber) {
            resolve(response.data[i].loan_id);
          }
        }
        resolve(null); // Loan number not found
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  function trimLoanArrears(values:loanArrearsInterface[]) {
    const tempdata: trimmedArrearsInterface[] = []
    values.forEach((item: loanArrearsInterface) => {
      tempdata.push({
        id: item.id.toString(),
        loan_id : item.loan_id,
        monthly_payment : item.monthly_payment.toString(),
        monthly_arrears : item.monthly_arrears.toString(),
        arr_cal_date : item.arr_cal_date
      })
    }
    )
    return tempdata
  }

  async function CalculateAllArrears() {
    try {
      await getAllNumbers();
      const tempdata: loanArrearsSubmitInterfacewitString[] = [];
      loanid?.forEach((item: number) => {
        tempdata.push({
          loan_id: item,
          additional_fees: 0,
          arr_cal_date: currentDate,
        });
      });
      console.log(tempdata);
      const response = await axios.post(API_ENDPOINTS.getAllArrearsOnce, tempdata);
      alert(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  

  function handleClickMore(id: string) {
    findLoanIDByNumber(id)
      .then((loanID) => {
        console.log(loanID);})
  }

  return (
    <div>{loading && !allarrears ? <Loader/> : 
    <div>
      <Drawer opened={opened} onClose={close} title="Search and Filter" size="35%">
        <SearchComponents/>
      </Drawer>
      { allarrears.length === 0 ? <h1>No Arrears</h1> : 
      <TableAllLoanArrears 
        data={allarrears} 
        onSubmitCalculate={() => CalculateAllArrears()}
        onClickMore={(id : string) => {handleClickMore(id)}}
        onClickAdd={() => open()}
        />
      }
      
    </div>
    }
    </div>
  )
}

export default ViewAllArrears