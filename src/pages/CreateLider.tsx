import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import FormInput from "../components/FormInput"
import SeguidorLiderForm from "../components/SeguidorLiderForm"


const CreateLider = () => {

  const navigate = useNavigate()

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
    console.log(form)
  }

  return (
    <div className="flex flex-col items-center my-4 space-y-4">
      <button onClick={()=>{navigate('/lideres')}}>Ir a lideres</button>
      <h1>Registrar lider</h1>
      <SeguidorLiderForm form={form} onChange={onChange} onSubmit={onSubmit} btnMessage="Registrar"/>
    </div>
  )
}

export default CreateLider