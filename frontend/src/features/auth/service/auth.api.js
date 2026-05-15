import axios from "axios";

const authApi = axios.create({
    baseURL : "http://localhost:3000/api/auth",
    withCredentials : true
})

export async function register(formData){
    const response = await authApi.post("/register" , 
        formData
    )

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