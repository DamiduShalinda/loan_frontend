import React , { useState , useEffect , useContext}from 'react'
import { Navbar } from '../Components/Navbar'
import axios from 'axios'
import AuthContext from '../Context/AuthContext'


export const ViewLoans = () => {

    const [loans , setLoans] = useState<loanType[]>([]);
    const { contextData } = useContext(AuthContext)

    type loanType = {
        loan_id : number,
        loan_amount : number,
        loan_name : string,
    }

    useEffect(() => {
        getLoans();
    }, [])

    const getLoans = async () => {

        axios.get('http://localhost:8000/loans/getloans', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + contextData.authTokens.access
            }
        } ).then((response) => {
            setLoans(response.data)
            console.log(response.data)
        }).catch((err) => {
            console.log(err)
        })
    }


  return (
    <div>
        <Navbar/>
        <ul>
        {loans.map((loan) => (
          <li key={loan.loan_id} className='text-white'>
            Loan ID: {loan.loan_id} | Amount: {loan.loan_amount} | name: {loan.loan_name}
          </li>
        ))}
      </ul>
    </div>
  )
}
