import LoanCalculatorInputs from '../Components/LoanCalculatorInputs'
import { PPMT , PMT , IPMT , ROUND} from '@formulajs/formulajs'
import React , {useEffect} from "react"
import { TableScrollArea } from '../Components/Table'
import { useDisclosure } from '@mantine/hooks';
import { Modal, useMantineTheme , ColorSchemeProvider , MantineProvider , ColorScheme  , Center} from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';


interface LoanCalculatorProps {
    loanAmount: number,
    interestRate: number,
    loanyears: number,
    loanMonths: number,
  }

  interface MonthlyPayment {
    month: number,
    monthlyCapital: number,
    monthlyInterest: number,
    remainder: number
  }

  interface JsonData {
    monthlyRental: number,
    monthlyPayment: MonthlyPayment[]
  }


function LoanCalculator() {

    const [opened, { open, close }] = useDisclosure(false);
    const [monthlyPayment, setMonthlyPayment] = React.useState<MonthlyPayment[]>([])
    const [jsonData , setJsonData] = React.useState<JsonData>()
    const [isSubmitted , setIsSubmitted] = React.useState<boolean>(false)
    const theme = useMantineTheme();

    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
      key: 'mantine-color-scheme',
      defaultValue: 'light',
      getInitialValueInEffect: true,
    });
  
    const toggleColorScheme = (value?: ColorScheme) =>
      setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  
    useHotkeys([['mod+J', () => toggleColorScheme()]]);
  
  
  
    const handleSubmit = (data:LoanCalculatorProps) => {
      calculateLoan(data)
      setIsSubmitted(true)
        open()
    }
  
    useEffect(() => {
      console.log(jsonData)
    }, [jsonData])
  
    const calculateLoan = (data:LoanCalculatorProps) => {
      const loanAmount = data.loanAmount
      const interestRate = (data.interestRate)/100/12
      const loanYears = data.loanyears
      const loanMonths = data.loanMonths
      const totalMonths = loanYears * 12 + loanMonths
      let monthlyRental = PMT(interestRate, totalMonths, -300000, 0, 0)
      monthlyRental = ROUND(monthlyRental, 2)
  
      const tempMonthlyPayment: MonthlyPayment[] = [];
  
      for (let index = 1; index <= totalMonths; index++) {
        let monthlyInterest = IPMT(interestRate, index, totalMonths, -loanAmount, 0, 0)
        let monthlyCapital = PPMT(interestRate, index, totalMonths, -loanAmount, 0, 0)
        monthlyInterest = ROUND(monthlyInterest, 2)
        monthlyCapital = ROUND(monthlyCapital, 2)
  
        const payment:MonthlyPayment = {
          month: index,
          monthlyInterest: monthlyInterest,
          monthlyCapital: monthlyCapital,
          remainder: loanAmount - monthlyCapital
        }
        
        tempMonthlyPayment.push(payment)
  
        
      }
  
      setMonthlyPayment(tempMonthlyPayment)
  
      const values = {
        monthlyRental: monthlyRental,
        monthlyPayment: tempMonthlyPayment
      }
      console.log(values);
      
      setJsonData(values)
    }
  
  
  return (
    <>
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{colorScheme}}>
    
    <LoanCalculatorInputs onSubmit={(data: LoanCalculatorProps) => handleSubmit(data)}/>
    
    <Modal opened={opened} onClose={close} title="Monthly Payments" centered size="auto" >
    <h3> Monthly Payment : {jsonData?.monthlyRental}</h3>  
    {isSubmitted && jsonData && 
        <TableScrollArea data={jsonData.monthlyPayment} headers={["month" , "monthlyInterest" , "monthlyCapital" ,  "remainder"]}/>
    }
      </Modal>
      </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}

export default LoanCalculator