import { Lider } from "../interfaces/lideres"
import { Persona, PersonaCore } from "../interfaces/persona"
import { Seguidor, SeguidorDto } from "../interfaces/seguidor"
import { confirmAdapter } from "./notiflix"


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

    async delete(id: number){
        const didConfirm = await confirmAdapter.Warning({
            title:"Eliminar seguidor",
            message:"¿Estas seguro que deseas eliminar a este seguidor?",
            okText:"Eliminar",
        })

        if(!didConfirm) return false

        const res = await fetch(import.meta.env.VITE_API_URL+'/seguidores/'+id,{
            method:'DELETE',
            credentials:'include',
        })

        const resData = await res.json()

        if(this.tokenRegExp.test(resData.error)){
            throw new Error()
        }

        return resData.success as boolean
    }

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