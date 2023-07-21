import { BrowserRouter , Route , Routes } from "react-router-dom";
import { LandingPage } from "./Pages/LandingPage";
import LoanCalculator from "./Pages/LoanCalculator";
import Layout from "./Layout";
import Homepage from "./Pages/Homepage";
import AddCustomersPage from "./Pages/AddCustomersPage";
import ViewAllCustomersPage from "./Pages/ViewAllCustomersPage";
import { AuthProvider } from "./Context/AuthContext";
import  Protected  from "./utils/Protected"
import AddNewEmployee from "./Pages/AddNewEmployee";
import ViewAllEmployees from "./Pages/ViewAllEmployees";
import AddNewLoan from "./Pages/AddNewLoan";
import ViewAllLoans from "./Pages/ViewAllLoans";
import LoanPayments from "./Components/LoanPayments";
import ViewLoanArrears from "./Pages/ViewLoanArrears";
import ViewAllArrears from "./Pages/ViewAllArrears";

function AppRouter() {
//TODO : need to pass the id of the loan to the view loan arrears page


  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
         <Route path="/" element={<LandingPage/>}/>
         <Route path="/homepage" 
                element={
                  <Protected>
                  <Layout><Homepage/></Layout>
                  </Protected>
                  } />
         <Route path="/loancalculator" element={<LoanCalculator/>} />
         <Route path="/customers/addnew" 
                element={
                  <Protected>
                  <Layout><AddCustomersPage/></Layout>
                  </Protected>
                  } 
                />
         <Route path="/customers/viewall" 
                element={
                  <Protected>
                  <Layout><ViewAllCustomersPage/></Layout>
                  </Protected>
                  }  />
         <Route path="/employees/addnew" 
                element={
                  <Protected>
                  <Layout><AddNewEmployee/></Layout>
                  </Protected>
                  } 
                />
        <Route path="/employees/viewall" 
                element={
                  <Protected>
                  <Layout><ViewAllEmployees/></Layout>
                  </Protected>
                  } 
                /> 
        <Route path="/loans/addnew" 
                element={
                  <Protected>
                  <Layout><AddNewLoan/></Layout>
                  </Protected>
                  } 
                />
        <Route path="/loans/viewall" 
                element={
                  <Protected>
                  <Layout><ViewAllLoans/></Layout>
                  </Protected>
                  } 
                />          
        <Route path="/loans/moredetails/:id" 
                element={
                  <Protected>
                  <Layout><LoanPayments/></Layout>
                  </Protected>
                  } 
                />
        <Route path="/arrears/one/:id" 
                element={
                  <Protected>
                  <Layout><ViewLoanArrears/></Layout>
                  </Protected>
                  } 
                />             
        <Route path="/viewallarrears" 
                element={
                  <Protected>
                  <Layout><ViewAllArrears/></Layout>
                  </Protected>
                  } 
                />             
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default AppRouter