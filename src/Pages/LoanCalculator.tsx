import LoanCalculatorInputs from '../Components/LoanCalculatorInputs'
import { PPMT , PMT , IPMT , ROUND} from '@formulajs/formulajs'
import React , {useEffect} from "react"


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

    const [monthlyPayment, setMonthlyPayment] = React.useState<MonthlyPayment[]>([])
    const [jsonData , setJsonData] = React.useState<JsonData>()
    const [isSubmitted , setIsSubmitted] = React.useState<boolean>(false)
  
    const handleSubmit = (data:LoanCalculatorProps) => {
      calculateLoan(data)
      setIsSubmitted(true)
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
          monthlyCapital: monthlyCapital,
          monthlyInterest: monthlyInterest,
          remainder: loanAmount - monthlyCapital
        }
        
        tempMonthlyPayment.push(payment)
  
        
      }
  
      setMonthlyPayment(tempMonthlyPayment)
  
      const values = {
        monthlyRental: monthlyRental,
        monthlyPayment: tempMonthlyPayment
      }
      setJsonData(values)
    }
  
  
  return (
    <>
    <LoanCalculatorInputs onSubmit={(data: LoanCalculatorProps) => handleSubmit(data)}/>
    {isSubmitted && jsonData && 
        <div>
            <h1>Monthly Rental: {jsonData?.monthlyRental}</h1>
        </div>
    }
    </>
  )
}

export default LoanCalculator