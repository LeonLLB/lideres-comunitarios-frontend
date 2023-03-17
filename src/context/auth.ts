import {createContext, Dispatch, SetStateAction, useState} from 'react'

export interface AuthContextState{
    didInitialValidation:boolean
    isValidationOk:boolean,
    isAdmin: boolean
}

const AuthContext = createContext<{setState:Dispatch<SetStateAction<AuthContextState>>,state:AuthContextState}>({}as any)

export {
    AuthContext
}