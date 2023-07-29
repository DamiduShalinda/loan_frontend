import { useEffect, useState } from "react"
import { loanArrearsInterface,  loanArrearsSubmitInterfacewitString } from "./ViewLoanArrears"
import axios from "axios"
import { API_ENDPOINTS } from "../api"
import { Loader  , Drawer, Title, Button, Center} from "@mantine/core"
import { TableAllLoanArrears } from "../Components/Tables/TableAllLoanArrears"
import { loanNumbertype } from "../Components/HomePageInputs"
import { useDisclosure } from "@mantine/hooks"
import SearchComponents, { filtertypes } from "../Components/SearchComponentsDrawer"
import { notifications } from "@mantine/notifications"
import { IconCheck } from '@tabler/icons-react'; 
import { useNavigate } from "react-router-dom"

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
  const navigate = useNavigate()

  
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
      const response = await axios.post(API_ENDPOINTS.getAllArrearsOnce, tempdata);
      console.log(response.data);
      notifications.show({
        title: 'Success !',
        message: 'All Arrears Calculated Successfully',
        color: 'red',
        autoClose: 5000,
        icon : <IconCheck/>
    })
    } catch (error) {
      console.error(error);
    }
  }
  

  function handleClickMore(id: string) {
    findLoanIDByNumber(id)
      .then((loanID) => {
        navigate(`/arrears/one/${loanID}`);
      })
  }

  function handlefilter(value: filtertypes): void {
    let apiurl = API_ENDPOINTS.getAllArrears
    if (value.location !== '') {
      apiurl = apiurl + `?location=${value.location}`
    }
    if (value.min !== 0) {
      apiurl = apiurl + `&pricemin=${value.min}`
    }
    if (value.max !== 0) {
      apiurl = apiurl + `&pricemax=${value.max}`
    }
    axios.get(apiurl)
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

  function handleDateSubmit(value: Date): void {
    console.log(value)
  }


  return (
    <div>{loading && !allarrears ? <Loader/> : 
    <div>
      <Drawer opened={opened} onClose={close} title="Search and Filter" size="35%">
        <SearchComponents
            onDateSubmit={(value: Date) => handleDateSubmit(value)}
            onFilterSubmit={(value: filtertypes) => handlefilter(value)}
            />
      </Drawer>
      { allarrears.length === 0 ?
       <>
       <Title order={1} style={{textAlign:"center"}}>No Arrears Found</Title>
       <Center mt={"xl"}>
       <Button onClick={() => CalculateAllArrears()}>Calculate Arrears</Button>
       </Center>
       </> 
       
       : 
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