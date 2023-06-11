import { BrowserRouter , Route , Routes } from "react-router-dom";
import { LandingPage } from "./Pages/LandingPage";
import LoanCalculator from "./Pages/LoanCalculator";


function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
         <Route path="/" element={<LandingPage/>} />
         <Route path="/loancalculator" element={<LoanCalculator/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter