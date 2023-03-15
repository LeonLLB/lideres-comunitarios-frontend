

class AuthController {

    fetchPostDefaultConfig = {}

    async login(dto: {cedula:number,password:string}){
        const res = await fetch(import.meta.env.VITE_API_URL+'/auth/login',{
            credentials:'include',
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(dto)
        })
        
        return res.status === 202
    }

    async manualValidate(){
        const res = await fetch(import.meta.env.VITE_API_URL+'/auth/revalidate',{
            credentials:'include',
            method:'POST',
        })
        
        return res.status === 200
    }

    async logout(){
        const res = await fetch(import.meta.env.VITE_API_URL+'/auth/logout',{
            credentials:'include',
            method:'POST',
        })
        
        return res.status === 202
    }

}

export const authController = new AuthController()