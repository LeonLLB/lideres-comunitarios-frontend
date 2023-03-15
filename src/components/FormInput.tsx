import { ChangeEvent, DetailedHTMLProps, FC, HTMLInputTypeAttribute, InputHTMLAttributes } from "react"

interface FormInputProps {
    name: string,
    onChange: (e: ChangeEvent<HTMLInputElement>)=>void,
    label:string
    type: HTMLInputTypeAttribute
    rest?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
}

const FormInput: FC<FormInputProps> = ({name,label,onChange,type,...rest}) => {
  return (
    <div className="flex flex-col space-y-2">
        <label className="text-sm font-light" htmlFor={name}>{label}</label>
        <input {...rest} className="text-sm font-light border border-gray-700 p-1 rounded-sm outline-none" type={type} id={name} name={name} onChange={onChange} />
    </div>
  )
}

export default FormInput