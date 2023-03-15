import { useState } from 'react'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import ConsultarLideres from './pages/ConsultarLideres'
import Login from './pages/Login'
import './tw.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/lideres' element={<ConsultarLideres/>}/>
      </Routes>
    </Router>
  )
}

export default App
