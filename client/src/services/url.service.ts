import type { AxiosError } from "axios";
import api from "../config/axiosConfig";
const getUserUrls=async()=>{
    try {
        const response=await api.get('/url')
        return response.data
    } catch (error) {
        const err= error as AxiosError
        throw new Error(err.message)   
    }
}
const shortUrl=async(originalUrl:string)=>{
    try {
        const response=await api.post('/url/shorten',{originalUrl})
        return response.data
    } catch (error) {
        const err= error as AxiosError
        throw new Error(err.message)
        
    }
}
export {
    getUserUrls,shortUrl
}