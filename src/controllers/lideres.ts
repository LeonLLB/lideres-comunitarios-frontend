import { Lider } from "../interfaces/lideres"
import { Persona, PersonaCore } from "../interfaces/persona"
import { confirmAdapter, loadingAdapter } from "./notiflix"


class LiderController{

    private tokenRegExp = new RegExp('oken')

    async getAll(){
        loadingAdapter.display('Obteniendo lideres')
        const res = await fetch(import.meta.env.VITE_API_URL+'/lideres/',{
            credentials:'include'
        })
        
        const resData = await res.json()
        loadingAdapter.hide()

        if(this.tokenRegExp.test(resData.error)){
            throw new Error()
        }

        if(resData.error) return []

        const {data}: {data:Lider[]} = resData

        return data

    }

    async getOne(id: number){
        loadingAdapter.display('Obteniendo lider')
        const res = await fetch(import.meta.env.VITE_API_URL+'/lideres/'+id,{
            credentials:'include'
        })

        const resData = await res.json()
        loadingAdapter.hide()
        if(this.tokenRegExp.test(resData.error)){
            throw new Error()
        }

        const {data}: {data:Lider} = resData

        return data

    }

    async update(dto: PersonaCore, id: number){
        loadingAdapter.display('Actualizando lider')
        const res = await fetch(import.meta.env.VITE_API_URL+'/lideres/'+id,{
            method:'PUT',
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

    async delete(id: number){
        
        const didConfirm = await confirmAdapter.Warning({
            title:"Eliminar lider",
            message:"¿Estas seguro que deseas eliminar a este lider?, tambien se eliminarán a sus seguidores",
            okText:"Eliminar",
        })
        
        if(!didConfirm) return false
        loadingAdapter.display('Eliminando lider')

        const res = await fetch(import.meta.env.VITE_API_URL+'/lideres/'+id,{
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

    async register(dto: PersonaCore){
        
        loadingAdapter.display('Registrando lider')

        const res = await fetch(import.meta.env.VITE_API_URL+'/lideres/',{
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

export const liderController = new LiderController()