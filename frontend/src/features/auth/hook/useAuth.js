import {setUser , setLoading , setError} from "../state/auth.slice"
import {register , login , getMe , logout} from "../service/auth.api"
import { useDispatch } from "react-redux"

export const useAuth = () => {
    const dispatch = useDispatch()

    async function handleRegister(FormData){
        dispatch(setLoading(true))
        const data = await register(FormData)
        dispatch(setUser(data.user))
        dispatch(setLoading(false))
        return data.user
    }

    async function handleLogin(FormData){
        dispatch(setLoading(true))
        const data = await login(FormData)
        dispatch(setUser(data.user))
        dispatch(setLoading(false))
        return data.user
    }

    async function handleGetMe(){
        const data = await getMe()
        dispatch(setUser(data.user))
        return data.user
    }

    async function handleLogout(){
        const data = await logout()
        dispatch(setUser(null))
        return data.user
    }

    return {handleRegister , handleLogin , handleGetMe , handleLogout}
}