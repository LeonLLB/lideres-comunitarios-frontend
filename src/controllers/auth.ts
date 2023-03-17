import { loadingAdapter } from "./notiflix"


class AuthController {

    async login(dto: {cedula:number,password:string}){
        loadingAdapter.display('Iniciando sesión')
        const res = await fetch(import.meta.env.VITE_API_URL+'/auth/login',{
            credentials:'include',
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(dto)
        })
        
        const isOk = res.status === 202
        
        if(!isOk) return {isOk,rol:null}
        
        const {rol}:{rol:string} = await res.json()
        loadingAdapter.hide()
        
        return {isOk,rol}
    }

    async manualValidate(){
        loadingAdapter.display('Revalidando sesión')
        const res = await fetch(import.meta.env.VITE_API_URL+'/auth/revalidate',{
            credentials:'include',
            method:'POST',
        })
        
        const isOk = res.status === 200
        
        loadingAdapter.hide()
        if(!isOk) return {isOk,rol:null}
        
        const {rol}:{rol:string} = await res.json()

        return {isOk,rol}
    }

    async logout(){
        loadingAdapter.display('Cerrando sesión')
        const res = await fetch(import.meta.env.VITE_API_URL+'/auth/logout',{
            credentials:'include',
            method:'POST',
        })
        loadingAdapter.hide()
        
        return res.status === 202
    }

}

export const authController = new AuthController()