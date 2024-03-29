import { useContext, useEffect, useState } from 'react'
import {HashRouter as Router, Route,Routes, useNavigate} from 'react-router-dom'
import AuthRoute from './components/AuthRoute'
import { AuthContext, AuthContextState } from './context/auth'
import { authController } from './controllers/auth'
import ConsultarLider from './pages/ConsultarLider'
import ConsultarLideres from './pages/ConsultarLideres'
import CreateLider from './pages/CreateLider'
import CreateSeguidor from './pages/CreateSeguidor'
import Login from './pages/Login'
import UpdateLider from './pages/UpdateLider'
import UpdateSeguidor from './pages/UpdateSeguidor'
import './tw.css'

const AuthRoutes = () => {

  const navigate = useNavigate()
  const authState = useContext(AuthContext)

  useEffect(() => {
    if (authState.state.didInitialValidation) return
    authController.manualValidate().then(({isOk,rol})=>{
        authState.setState({
          didInitialValidation:true,
          isValidationOk:isOk,
          isAdmin:rol==="A"
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
      <Route path='/lideres/:id/actualizar' element={ <AuthRoute requiredAuth element={<UpdateLider/>}/>}/>
      <Route path='/lideres/:id/seguidor/crear' element={ <AuthRoute requiredAuth element={<CreateSeguidor/>}/>}/>
      <Route path='/lideres/:id/seguidor/actualizar/:seguidorId' element={ <AuthRoute requiredAuth element={<UpdateSeguidor/>}/>}/>
    </Routes>
  )

}

function App() {
  
  const AuthState = useState<AuthContextState>({didInitialValidation:false,isValidationOk:false,isAdmin:false})


  return (
    <AuthContext.Provider value={{setState:AuthState[1],state:AuthState[0]}}>
      <Router>
        <AuthRoutes></AuthRoutes>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
