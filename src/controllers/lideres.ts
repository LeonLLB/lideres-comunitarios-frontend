import { Lider } from "../interfaces/lideres"
import { Persona, PersonaCore } from "../interfaces/persona"


class LiderController{

    private tokenRegExp = new RegExp('oken')

    async getAll(){
        const res = await fetch(import.meta.env.VITE_API_URL+'/lideres/',{
            credentials:'include'
        })

        const resData = await res.json()

        if(this.tokenRegExp.test(resData.error)){
            throw new Error()
        }

        if(resData.error) return []

        const {data}: {data:Lider[]} = resData

        return data

    }

    async getOne(id: number){
        const res = await fetch(import.meta.env.VITE_API_URL+'/lideres/'+id,{
            credentials:'include'
        })

        const resData = await res.json()

        if(this.tokenRegExp.test(resData.error)){
            throw new Error()
        }

        const {data}: {data:Lider} = resData

        return data

    }

    async update(dto: PersonaCore, id: number){
        const res = await fetch(import.meta.env.VITE_API_URL+'/lideres/'+id,{
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

    async register(dto: PersonaCore){
        const res = await fetch(import.meta.env.VITE_API_URL+'/lideres/',{
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

export const liderController = new LiderController()