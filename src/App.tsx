import AddNewLoans from "./Pages/AddNewLoans";
import Homepage from "./Pages/Homepage";
import Login from "./Pages/Login"
import  { Routes } from "react-router-dom"; 
import { Route} from 'react-router-dom'
import Protected from "./utils/Protected";
import { AuthProvider } from "./Context/AuthContext";

const App = () => {

  return (
    <div>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/homepage" element={<Homepage/>}/>
        <Route
            path="/addnewloans"
            element={
              <Protected isSigned={true}>
                <AddNewLoans />
              </Protected>
            }
          />
      </Routes>
      </AuthProvider>
      </div>
  )
}

export default App
