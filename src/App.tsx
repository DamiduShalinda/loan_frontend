import AppRouter from './AppRouter';
import { LandingPage } from './Pages/LandingPage';
import { TableScrollArea } from './Pages/Table';
import { tableData } from './data';

function App() {

  return (
      <>
      <TableScrollArea data={tableData} />
      
      </>
  )
}

export default App
