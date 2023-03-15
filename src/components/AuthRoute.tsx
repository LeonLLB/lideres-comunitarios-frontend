import { FC, ReactElement, useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/auth"

interface AuthRouteProps{
    element: ReactElement,
    requiredAuth?: boolean
}

const AuthRoute: FC<AuthRouteProps> = ({element, requiredAuth = false}) => {

    const authState = useContext(AuthContext)

    if (!requiredAuth) return element

    if(!authState.state.didInitialValidation || !authState.state.isValidationOk) {
        return <Navigate to="/" replace/>
    }

    return element
}

export default AuthRoute