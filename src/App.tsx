import Homepage from "./Pages/Homepage";
import Login from "./Pages/Login"
import  { Routes , Route } from "react-router-dom"; 


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/homepage" element={<Homepage/>}/>
      </Routes>
      </div>
  )
}

export default App
