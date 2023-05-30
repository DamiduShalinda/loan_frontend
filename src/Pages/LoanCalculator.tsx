import axios from "axios"
import LoanCalFields, { CalcData } from "../Components/LoanCalFields"


function LoanCalculator() {

  const handleSubmit = (data:CalcData) => {
    axios.post('http://127.0.0.1:8000/loandetails/loanvalues', data)
    .then(res => {
      console.log(res.data)
    })
  }

  
  return (
    <div>
      <LoanCalFields onSubmit={(data:CalcData) => handleSubmit(data)} />
    </div>
  )
}

export default LoanCalculator