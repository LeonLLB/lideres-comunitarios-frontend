import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SeguidorLiderForm from '../components/SeguidorLiderForm'
import { liderController } from '../controllers/lideres'
import { seguidorController } from '../controllers/seguidor'

const UpdateSeguidor = () => {
 
    const navigate = useNavigate()
    const {seguidorId, id} = useParams()

    const [form,setForm] = useState({
      nombre:'',
      apellido:'',
      apodo:'',
      cedula:'',
      telefono:'',
      email:'',
      parroquia:'',
      comunidad:''
    })
  
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setForm({
        ...form,
        [e.target.name]:e.target.value
      })
    }
  
    const onSubmit = (e: FormEvent) => {
      e.preventDefault()
      if(
        !id || isNaN(+id) || 
        !seguidorId || isNaN(+seguidorId)
    ){
        navigate('/lideres/'+id)
        return
    }
      seguidorController.update({...form,cedula:+form.cedula,liderId:+id},+seguidorId)
      .then(response=>{
        if(response.error){
          //TODO: MANEJO DE ERROR
          return
        }
        navigate('/lideres/'+id)
      })
    }

    useEffect(() => {
        if(
            !id || isNaN(+id) || 
            !seguidorId || isNaN(+seguidorId)
        ){
            navigate('/lideres/'+id)
            return
        }
        seguidorController.getOne(+seguidorId)
        .then(seguidor=>{
            if(!seguidor){
                navigate('/lideres/'+id)
                return
            }
            setForm({
                ...seguidor,
                cedula:seguidor.cedula.toString()
            })
        })
    }, [])
  
    return (
      <div className="flex flex-col items-center my-4 space-y-4">
        <button onClick={()=>{navigate('/lideres')}}>Ir a lideres</button>
        <h1>Modificar seguidor</h1>
        <SeguidorLiderForm form={form} onChange={onChange} onSubmit={onSubmit} btnMessage="Modificar"/>
      </div>
    )
}

export default UpdateSeguidor