import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SeguidorLiderForm from '../components/SeguidorLiderForm'
import { seguidorController } from '../controllers/seguidor'

const CreateSeguidor = () => {
 
  const navigate = useNavigate()

  const {id} = useParams()

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
    if(!id || isNaN(+id)){
      navigate('/lideres')
      return
    }
    seguidorController.register({...form,cedula:+form.cedula,liderId:+id})
    .then(response=>{
      if(response.error){
        //TODO: MANEJO DE ERROR
        return
      }
      navigate('/lideres/'+id)
    })
  }

  return (
    <div className="flex flex-col items-center my-4 space-y-4">
      <button onClick={()=>{navigate('/lideres')}}>Ir a lideres</button>
      <h1>Registrar seguidor</h1>
      <SeguidorLiderForm form={form} onChange={onChange} onSubmit={onSubmit} btnMessage="Registrar"/>
    </div>
  )
}

export default CreateSeguidor