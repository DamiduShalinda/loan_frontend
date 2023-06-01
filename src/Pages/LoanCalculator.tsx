import LoanCalFields, { CalcData } from "../Components/LoanCalFields"
import React , {useEffect} from "react"
import { PPMT , PMT , IPMT , ROUND} from '@formulajs/formulajs'



function LoanCalculator() {

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

  const [monthlyPayment, setMonthlyPayment] = React.useState<MonthlyPayment[]>([])
  const [jsonData , setJsonData] = React.useState<JsonData>()
  const [isSubmitted , setIsSubmitted] = React.useState<boolean>(false)

  const handleSubmit = (data:CalcData) => {
    calculateLoan(data)
    setIsSubmitted(true)
  }

  useEffect(() => {
    console.log(jsonData)
  }, [jsonData])

  const calculateLoan = (data:CalcData) => {
    const loanAmount = parseFloat(data.loanAmount)
    const interestRate = (parseFloat(data.interestRate)/100/12)
    const loanYears = parseInt(data.loanYears)
    const loanMonths = parseInt(data.loanMonths)
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
    <div className="flex flex-row gap-24 ">
      <LoanCalFields onSubmit={(data:CalcData) => handleSubmit(data)} />
      {isSubmitted && 
            <div className="text-white absolute left-[40%] top-[20%]">
        
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200 font-bold">
                  <th className="py-2 px-4 border-b">Month</th>
                  <th className="py-2 px-4 border-b border-l">Monthly Rental</th>
                  <th className="py-2 px-4 border-b border-l">Monthly Capital</th>
                  <th className="py-2 px-4 border-b border-l">Monthly Interest</th>
                  <th className="py-2 px-4 border-b border-l">Remaining Value</th>
                </tr>
              </thead>
              <tbody>
                {monthlyPayment.map(payment => (
                  <tr key={payment.month}>
                    <td className="py-2 px-4 border-b ">{payment.month}</td>
                    <td className="py-2 px-4 border-b border-l">{jsonData?.monthlyRental}</td>
                    <td className="py-2 px-4 border-b border-l">{payment.monthlyCapital}</td>
                    <td className="py-2 px-4 border-b border-l">{payment.monthlyInterest}</td>
                    <td className="py-2 px-4 border-b border-l">{payment.remainder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>}
    </div>
  )
}

export default LoanCalculator