import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import SeguidorLiderForm from "../components/SeguidorLiderForm"
import { AuthContext } from "../context/auth"
import { liderController } from "../controllers/lideres"

const UpdateLider = () => {

  const navigate = useNavigate()
  const {id} = useParams()
  const authState = useContext(AuthContext)

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
      !id || isNaN(+id) 
  ){
      navigate('/lideres/'+id)
      return
  }
    liderController.update({...form,cedula:+form.cedula},+id)
    .then(response=>{
      if(response.error){
        //TODO: MANEJO DE ERROR
        return
      }
      navigate('/lideres/'+id)
    })
    .catch(()=>{
      authState.setState({
        didInitialValidation:true,
        isValidationOk:false
      })    
      navigate('/')
    })
  }

  useEffect(() => {
      if(
          !id || isNaN(+id) 
      ){
          navigate('/lideres/'+id)
          return
      }
      liderController.getOne(+id)
      .then(lider=>{
          if(!lider){
              navigate('/lideres/'+id)
              return
          }
          setForm({
              ...lider,
              cedula:lider.cedula.toString()
          })
      })
  }, [])

  return (
    <div className="flex flex-col items-center my-4 space-y-4">
      <button onClick={()=>{navigate('/lideres')}}>Ir a lideres</button>
      <h1>Modificar lider</h1>
      <SeguidorLiderForm form={form} onChange={onChange} onSubmit={onSubmit} btnMessage="Modificar"/>
    </div>
  )
}

export default UpdateLider