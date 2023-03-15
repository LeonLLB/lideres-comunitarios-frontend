import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import CenteredBox from "../components/CenteredBox"
import FormInput from "../components/FormInput"
import { AuthContext } from "../context/auth"
import { authController } from "../controllers/auth"

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
        .then((isOk)=>{
            authState.setState({
                didInitialValidation:true,
                isValidationOk:isOk
            })
            if(isOk){
                navigate('/lideres')
            }
        })
    }

    return(
        <CenteredBox>
            <form onSubmit={onSubmit} className="flex flex-col items-center space-y-2">
                <h1 className="font-light text-xl">Sistema lideres</h1>
                <span className="font-light text-lg">Iniciar sesión</span>
                <FormInput rest={{required:true}} name="cedula" label="Cedula" type="number" onChange={onChange}/>
                <FormInput rest={{required:true}} name="password" label="Contraseña" type="password" onChange={onChange}/>
                <button className="p-1 text-sm border border-gray-500 rounded-sm">Iniciar sesión</button>
            </form>
        </CenteredBox>
    )

}

export default Login