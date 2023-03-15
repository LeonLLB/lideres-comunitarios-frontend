import { ChangeEvent, FC, FormEvent } from 'react'
import FormInput from './FormInput'

interface SeguidorLiderFormProps {
    form: any,
    onSubmit: (e: FormEvent) => void
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    btnMessage: string
}

const SeguidorLiderForm: FC<SeguidorLiderFormProps> = ({onSubmit,onChange,form,btnMessage}) => {
  return (
    <form className="grid grid-cols-2 gap-4" onSubmit={onSubmit}>
        <FormInput rest={{required:true,minLength:7}} value={form.cedula} name="cedula" label="Cedula" type="number" onChange={onChange}/>
        <FormInput rest={{ required: true }} value={form.nombre} name="nombre" label="Nombre" type="text" onChange={onChange}/>
        <FormInput rest={{required:true}} value={form.apellido} name="apellido" label="Apellido" type="text" onChange={onChange}/>
        <FormInput rest={{required:true}} value={form.apodo} name="apodo" label="Apodo" type="text" onChange={onChange}/>
        <FormInput rest={{required:true}} value={form.telefono} name="telefono" label="Telefono" type="tel" onChange={onChange}/>
        <FormInput rest={{required:true}} value={form.email} name="email" label="Correo" type="email" onChange={onChange}/>
        <FormInput rest={{required:true,minLength:5}} value={form.parroquia} name="parroquia" label="Parroquia" type="text" onChange={onChange}/>
        <FormInput rest={{required:true,minLength:5}} value={form.comunidad} name="comunidad" label="Comunidad" type="text" onChange={onChange}/>
        <button className="col-span-2">{btnMessage}</button>
      </form>
  )
}

export default SeguidorLiderForm