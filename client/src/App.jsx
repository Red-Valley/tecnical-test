import './App.css'
import { Outlet } from 'react-router-dom'
import ButtonAppBar from './Components/Layouts/Navbar'

function App() {

  return (
    <div className="App">
      <ButtonAppBar />
      <Outlet/>
    </div>
  )
}

export default App
