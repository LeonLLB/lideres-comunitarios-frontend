import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import CenteredBox from "../components/CenteredBox"
import FormInput from "../components/FormInput"
import { AuthContext } from "../context/auth"
import { authController } from "../controllers/auth"
import { notifyAdapter } from "../controllers/notiflix"

const Login = () => {

    const navigate = useNavigate()
    const authState = useContext(AuthContext)

    const [form, setForm] = useState({
        'cedula':'',
        'password':''
    })

    const onChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit = (e: FormEvent) =>{
        e.preventDefault()
        authController.login({cedula:+form.cedula,password:form.password})
        .then(({isOk,rol})=>{
            authState.setState({
                didInitialValidation:true,
                isValidationOk:isOk,
                isAdmin:rol==='A'
            })
            if(isOk){
                notifyAdapter.success('Sesión iniciada con exito')
                navigate('/lideres')
                return
            }
            notifyAdapter.error('Usuario o clave invalida')
        })
    }

    return(
        <CenteredBox>
            <form onSubmit={onSubmit} className="flex flex-col items-center space-y-2">
                <h1>Sistema lideres</h1>
                <span className="font-light text-lg">Iniciar sesión</span>
                <FormInput value={form.cedula} rest={{required:true}} name="cedula" label="Cedula" type="number" onChange={onChange}/>
                <FormInput value={form.password} rest={{required:true}} name="password" label="Contraseña" type="password" onChange={onChange}/>
                <button>Iniciar sesión</button>
            </form>
        </CenteredBox>
    )

}

export default Login