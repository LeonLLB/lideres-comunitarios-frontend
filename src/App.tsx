import { useContext, useEffect, useState } from 'react'
import {BrowserRouter as Router, Route,Routes, useNavigate} from 'react-router-dom'
import AuthRoute from './components/AuthRoute'
import { AuthContext, AuthContextState } from './context/auth'
import { authController } from './controllers/auth'
import ConsultarLideres from './pages/ConsultarLideres'
import Login from './pages/Login'
import './tw.css'

const AuthRoutes = () => {

  const navigate = useNavigate()
  const authState = useContext(AuthContext)

  useEffect(() => {
    if (authState.state.didInitialValidation) return
    authController.manualValidate().then(isOk=>{
        authState.setState({
          didInitialValidation:true,
          isValidationOk:isOk
        })
        if(isOk){navigate('/lideres')}
        else {navigate('/')}
    })
  })  

  return (
    <Routes>
      <Route  path='/' element={ <AuthRoute element={<Login/>}/> }/>
      <Route path='/lideres' element={ <AuthRoute requiredAuth element={<ConsultarLideres/>}/>}/>
    </Routes>
  )

}

function App() {
  
  const AuthState = useState<AuthContextState>({didInitialValidation:false,isValidationOk:false})


  return (
    <AuthContext.Provider value={{setState:AuthState[1],state:AuthState[0]}}>
      <Router>
        <AuthRoutes></AuthRoutes>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
