export interface Lider{
    id: number
    nombre: string
    apellido: string
    cedula: number
    apodo: string
    telefono: string
    email: string
    parroquia: string
    comunidad: string
    seguidores: never // TODO: SEGUIDORES ES UN ARREGLO DE SEGUIDORES, PUEDE SER NULO
}