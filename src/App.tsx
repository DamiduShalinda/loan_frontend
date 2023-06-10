import { Navbar } from "@mantine/core"
import { Footer } from "./Components/Footer"
import { links } from "./data"
import { NavbarMinimalColored } from "./Components/NavBar"

function App() {


  return (
      <>
      <NavbarMinimalColored/>
      <Footer links={links} />
      </>
  )
}

export default App
