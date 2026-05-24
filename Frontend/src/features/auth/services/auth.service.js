import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.PROD ? "/api/auth" : "http://localhost:8080/api/auth",
    withCredentials: true
})

export const login = async (username,email, password)=>{
    const response = await api.post("/login", {
        username,
        email,
        password
    })    
    
    return response.data
}

export const register = async ({username, email, password})=>{
    const response = await api.post("/register", {
        username,email,password
    })    
    
    return response.data
}

export const getMe = async ()=>{
    const response = await api.get("/get-me")    
    return response.data
}

export const logout = async ()=>{
    const response = await api.get("/logout")    
    return response.data
}