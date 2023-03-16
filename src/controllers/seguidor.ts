import { Lider } from "../interfaces/lideres"
import { Persona, PersonaCore } from "../interfaces/persona"
import { Seguidor, SeguidorDto } from "../interfaces/seguidor"


class SeguidorController{

    private tokenRegExp = new RegExp('oken')

    async getOne(id: number){

        const res = await fetch(import.meta.env.VITE_API_URL+'/seguidores/'+id,{
            credentials:'include'
        })

        const resData = await res.json()

        if(this.tokenRegExp.test(resData.error)){
            throw new Error()
        }

        const {data}: {data:Seguidor} = resData

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

        const resData = await res.json()

        if(this.tokenRegExp.test(resData.error)){
            throw new Error()
        }

        return resData
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

        const resData = await res.json()

        if(this.tokenRegExp.test(resData.error)){
            throw new Error()
        }

        return resData
    }

}

export const seguidorController = new SeguidorController()