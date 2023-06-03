import AddNewLoans from "./Pages/AddNewLoans";
import Homepage from "./Pages/Homepage";
import Login from "./Pages/Login"
import LoanCalculator from "./Pages/LoanCalculator";
import  { Routes } from "react-router-dom"; 
import { Route} from 'react-router-dom'
import Protected from "./utils/Protected";
import { AuthProvider } from "./Context/AuthContext";
import { ViewLoans } from "./Pages/ViewLoans";
import AddNewCustomers from "./Pages/AddNewCustomers";
import ViewAllCustomers from "./Pages/ViewAllCustomers";

const App = () => {

  return (
    <div>
      <AuthProvider>
      <Routes>
        <Route path='/loancalculator' element={<LoanCalculator/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/homepage" element={
          <Protected>
            <Homepage/>
          </Protected>
        }/>
        <Route path="/addnewloans" element={
              <Protected>
                <AddNewLoans />
              </Protected>
            }
          />
        <Route path="/viewloans" element={
              <Protected>
                <ViewLoans/>
              </Protected>
            }
          />
        <Route path="/addnewcustomers" element={
              <Protected>
                <AddNewCustomers/>
              </Protected>
            }
          />
        <Route path="/viewcustomers" element={
              <Protected>
                <ViewAllCustomers/>
              </Protected>
            }
          />
      </Routes>
      </AuthProvider>
      </div>
  )
}

export default App
