import { BrowserRouter , Route , Routes } from "react-router-dom";
import { LandingPage } from "./Pages/LandingPage";
import LoanCalculator from "./Pages/LoanCalculator";
import Layout from "./Layout";
import Homepage from "./Pages/Homepage";
import AddCustomersPage from "./Pages/AddCustomersPage";
import ViewAllCustomersPage from "./Pages/ViewAllCustomersPage";
import { AuthProvider } from "./Context/AuthContext";
import  Protected  from "./utils/Protected"

function AppRouter() {

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
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default AppRouter