import { ChangeEvent, FormEvent, useState } from "react"
import CenteredBox from "../components/CenteredBox"
import FormInput from "../components/FormInput"

const Login = () => {

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
        console.log(form)
    }

    return(
        <CenteredBox>
            <form onSubmit={onSubmit} className="flex flex-col items-center space-y-2">
                <h1 className="font-light text-xl">Sistema lideres</h1>
                <span className="font-light text-lg">Iniciar sesión</span>
                <FormInput rest={{required:true}} name="cedula" label="Cedula" type="text" onChange={onChange}/>
                <FormInput rest={{required:true}} name="password" label="Contraseña" type="password" onChange={onChange}/>
                <button className="p-1 text-sm border border-gray-500 rounded-sm">Iniciar sesión</button>
            </form>
        </CenteredBox>
    )

}

export default Login