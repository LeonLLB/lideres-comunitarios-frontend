
export interface PersonaCore{
    nombre: string
    apellido: string
    cedula: number
    apodo: string
    telefono: string
    email: string
    parroquia: string
    comunidad: string
}

export interface Persona extends PersonaCore {
    id: number
}