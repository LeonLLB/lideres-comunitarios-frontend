import { Lider } from "../interfaces/lideres"


class LiderController{

    async getAll(){
        const res = await fetch(import.meta.env.VITE_API_URL+'/lideres/',{
            credentials:'include'
        })

        if (res.status !== 202) return []

        const {data}: {data:Lider[]} = await res.json()

        return data

    }

    async getRawOne(){}

    async getOneWithSeguidores(){}

    async update(){}

    async delete(){}

    async register(){}

}

export const liderController = new LiderController()