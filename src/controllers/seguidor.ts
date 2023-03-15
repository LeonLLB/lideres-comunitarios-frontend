import { Lider } from "../interfaces/lideres"
import { Persona, PersonaCore } from "../interfaces/persona"
import { Seguidor, SeguidorDto } from "../interfaces/seguidor"


class SeguidorController{

    async getOne(id: number){

        const res = await fetch(import.meta.env.VITE_API_URL+'/seguidores/'+id,{
            credentials:'include'
        })

        if (res.status !== 202) return 

        const {data}: {data:Seguidor} = await res.json()

        return data
    }

    async update(dto: SeguidorDto,id: number){
        const res = await fetch(import.meta.env.VITE_API_URL+'/seguidores/'+id,{
            method:'PUT',
            credentials:'include',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(dto)
        })

        return res.json()
    }

    async delete(){}

    async register(dto: SeguidorDto){
        const res = await fetch(import.meta.env.VITE_API_URL+'/seguidores/',{
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

export const seguidorController = new SeguidorController()