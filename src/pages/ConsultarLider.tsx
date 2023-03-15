import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { liderController } from "../controllers/lideres"
import { Lider } from "../interfaces/lideres"

const ConsultarLider = () => {

  const [lider, setLider] = useState<Lider>()
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    getLider()
  }, [])

  const getLider = async () => {
    if (!id || isNaN(+id)) {
      navigate('/lideres')
      return
    }

    const lider = await liderController.getOne(+id)
    if (!lider) {
      navigate('/lideres')
      return
    }

    setLider(lider)
  }

  return (
    <div className="flex flex-col items-center mt-4 space-y-4">
      <button type="button" onClick={() => { navigate('/lideres') }}>Ir a lideres</button>
      {lider &&
        <div className="flex flex-col items-center space-y-4">
          <h1>Datos del lider: {lider.nombre} {lider.apellido} ({lider.apodo})</h1>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col space-y-2">
              <span>C.I: {lider.cedula}</span>
              <span>TLF: {lider.telefono}</span>
              <span>@: {lider.email}</span>
            </div>
            <div className="flex flex-col space-y-2">
              <span>Parroquia: {lider.parroquia}</span>
              <span>Comunidad: {lider.comunidad}</span>
            </div>
            <button>Actualizar</button>
            <button>Eliminar</button>
          </div>
          <h2>Seguidores del lider</h2>
          <button>Registrar seguidor</button>
          { !lider.seguidores || lider.seguidores.length === 0 &&
            <span>El lider no tiene ningun seguidor</span>
          }
          {lider.seguidores && lider.seguidores.length > 0 &&
            lider.seguidores.map(seguidor => (
              <div key={seguidor.id} className="grid grid-cols-2 gap-2 border border-gray-400 rounded p-2">
                <span className="col-span-2 text-center">{seguidor.nombre} {seguidor.apellido} ({seguidor.apodo})</span>
                <div className="flex flex-col space-y-2">
                  <span>C.I: {seguidor.cedula}</span>
                  <span>TLF: {seguidor.telefono}</span>
                  <span>@: {seguidor.email}</span>
                </div>
                <div className="flex flex-col space-y-2">
                  <span>Parroquia: {seguidor.parroquia}</span>
                  <span>Comunidad: {seguidor.comunidad}</span>
                </div>
                <hr className="col-span-2 border-black" />
                <button>Actualizar</button>
                <button>Eliminar</button>
              </div>
            ))
          }
        </div>
      }
    </div>
  )
}

export default ConsultarLider