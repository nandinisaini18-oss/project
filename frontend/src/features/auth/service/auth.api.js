import axios from "axios";

const authApi = axios.create({
    baseURL : "/auth/api",
    withCredentials : true
})

export async function register({fullname , email , password , contact , bio , age , gender , location , profilePicture , role , preferences}){
    const response = await authApi.post("/register" , {
        fullname , 
        email , 
        password , 
        contact , 
        bio , 
        age , 
        gender , 
        location , 
        profilePicture , 
        role , 
        preferences
    })

    return response.data
}

export async function login({email , password}){
    const response = await authApi.post("/login" , {
        email,
        password
    })

    return response.data
}

export async function getMe(){
    const response = await authApi.get("/get-me")

    return response.data
}

export async function logout(){
    const response = await authApi.post("/logout")

    return response.data
}