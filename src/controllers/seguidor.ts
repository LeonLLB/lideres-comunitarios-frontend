import { Lider } from "../interfaces/lideres"
import { Persona, PersonaCore } from "../interfaces/persona"
import { Seguidor, SeguidorDto } from "../interfaces/seguidor"
import { confirmAdapter, loadingAdapter } from "./notiflix"


class SeguidorController{

    private tokenRegExp = new RegExp('oken')

    async getOne(id: number){

        loadingAdapter.display('Consultando seguidor')

        const res = await fetch(import.meta.env.VITE_API_URL+'/seguidores/'+id,{
            credentials:'include'
        })

        const resData = await res.json()

        loadingAdapter.hide()

        if(this.tokenRegExp.test(resData.error)){
            throw new Error()
        }

        const {data}: {data:Seguidor} = resData

        return data
    }

    async update(dto: SeguidorDto,id: number){
        loadingAdapter.display('Actualizando seguidor')
        const res = await fetch(import.meta.env.VITE_API_URL+'/seguidores/'+id,{
            method:'PUT',
            credentials:'include',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(dto)
        })
        loadingAdapter.hide()

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
        loadingAdapter.display('Eliminando seguidor')
        const res = await fetch(import.meta.env.VITE_API_URL+'/seguidores/'+id,{
            method:'DELETE',
            credentials:'include',
        })

        const resData = await res.json()
        loadingAdapter.hide()

        if(this.tokenRegExp.test(resData.error)){
            throw new Error()
        }

        return resData.success as boolean
    }

    async register(dto: SeguidorDto){
        loadingAdapter.display('Registrando lider')
        const res = await fetch(import.meta.env.VITE_API_URL+'/seguidores/',{
            method:'POST',
            credentials:'include',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(dto)
        })

        const resData = await res.json()

        loadingAdapter.hide()

        if(this.tokenRegExp.test(resData.error)){
            throw new Error()
        }

        return resData
    }

}

export const seguidorController = new SeguidorController()