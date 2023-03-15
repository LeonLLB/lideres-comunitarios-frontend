import { Lider } from "../interfaces/lideres"
import { Persona, PersonaCore } from "../interfaces/persona"


class LiderController{

    async getAll(){
        const res = await fetch(import.meta.env.VITE_API_URL+'/lideres/',{
            credentials:'include'
        })

        if (res.status !== 202) return []

        const {data}: {data:Lider[]} = await res.json()

        return data

    }

    async getOne(id: number){
        const res = await fetch(import.meta.env.VITE_API_URL+'/lideres/'+id,{
            credentials:'include'
        })

        if (res.status !== 202) return 

        const {data}: {data:Lider} = await res.json()

        return data
    }

    async update(){}

    async delete(){}

    async register(dto: PersonaCore){
        const res = await fetch(import.meta.env.VITE_API_URL+'/lideres/',{
            method:'POST',
            credentials:'include',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(dto)
        })

        return res.json()
    }

}

export const liderController = new LiderController()