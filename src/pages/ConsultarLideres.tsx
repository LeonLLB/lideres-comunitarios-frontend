import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth"
import { authController } from "../controllers/auth"
import { liderController } from "../controllers/lideres"
import { Lider } from "../interfaces/lideres"


const ConsultarLideres = () => {

    const navigate = useNavigate()
    
  const authState = useContext(AuthContext)

    const [lideres, setLideres] = useState<Lider[]>([])

    useEffect(() => {
      getLideres()
    },[])

    const getLideres = async () => {
        try {
            const lideres = await liderController.getAll()
            setLideres(lideres)            
        } catch (error) {
            authState.setState({
                didInitialValidation:true,
                isValidationOk:false
              })    
              navigate('/')
              return
        }
    } 
    
    const logOut = async () => {
        await authController.logout()
        authState.setState({
            didInitialValidation:true,
            isValidationOk:false
          })    
          navigate('/')
          return
    }

    return (
        <div className="my-4 flex flex-col space-y-4 items-center">
            <h1>Lideres registrados</h1>
            <div className="flex flex-row space-x-4">
                <button onClick={()=>{navigate('crear')}}>Registrar lider</button>
                <button onClick={logOut}>Cerrar sesión</button>
            </div>
            {lideres.length === 0 &&
                <span>No hay lideres!</span>
            }
            {lideres.length > 0 && 
                lideres.map(lider=>(
                    <div key={lider.id} className="grid grid-cols-2 gap-2 border border-gray-400 rounded p-2">
                        <span onClick={()=>{navigate('/lideres/'+lider.id)}} className="hover:cursor-pointer col-span-2 text-center">{lider.nombre} {lider.apellido} ({lider.apodo})</span>
                        <div className="flex flex-col space-y-2">
                            <span>C.I: {lider.cedula}</span>
                            <span>TLF: {lider.telefono}</span>
                            <span>@: {lider.email}</span>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <span>Parroquia: {lider.parroquia}</span>
                            <span>Comunidad: {lider.comunidad}</span>
                        </div>
                        <hr className="col-span-2 border-black" />
                        <button onClick={()=>navigate(lider.id+'/actualizar')}>Actualizar</button>
                        <button>Eliminar</button>
                    </div>
                ))
            } 
        </div>
    )

}

export default ConsultarLideres