import { useContext, useEffect, useState } from 'react'
import {BrowserRouter as Router, Route,Routes, useNavigate} from 'react-router-dom'
import AuthRoute from './components/AuthRoute'
import { AuthContext, AuthContextState } from './context/auth'
import { authController } from './controllers/auth'
import ConsultarLider from './pages/ConsultarLider'
import ConsultarLideres from './pages/ConsultarLideres'
import CreateLider from './pages/CreateLider'
import CreateSeguidor from './pages/CreateSeguidor'
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
      <Route path='/lideres/crear' element={ <AuthRoute requiredAuth element={<CreateLider/>}/>}/>
      <Route path='/lideres/:id' element={ <AuthRoute requiredAuth element={<ConsultarLider/>}/>}/>
      <Route path='/lideres/:id/seguidor/crear' element={ <AuthRoute requiredAuth element={<CreateSeguidor/>}/>}/>
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
