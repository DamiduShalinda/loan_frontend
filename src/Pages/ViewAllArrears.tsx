import { useEffect, useState } from "react"
import { loanArrearsInterface } from "./ViewLoanArrears"
import axios from "axios"
import { API_ENDPOINTS } from "../api"
import { Loader  , Container} from "@mantine/core"
import { TableAllLoanArrears } from "../Components/Tables/TableAllLoanArrears"
import { tabledata } from "../data"

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

  return (
    <div>{loading && !allarrears ? <Loader/> : 
    <div>
      { allarrears.length === 0 ? <h1>No Arrears</h1> : 
      <TableAllLoanArrears data={allarrears}/>
      }
      
    </div>
    }
    </div>
  )
}

export default ViewAllArrears