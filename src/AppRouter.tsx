import { BrowserRouter , Route , Routes } from "react-router-dom";
import { LandingPage } from "./Pages/LandingPage";
import LoanCalculator from "./Pages/LoanCalculator";
import Layout from "./Layout";
import Homepage from "./Pages/Homepage";


function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
         <Route path="/" element={<LandingPage/>} />
         <Route path="/homepage" element={<Layout><Homepage/></Layout>} />
         <Route path="/loancalculator" element={<LoanCalculator/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter