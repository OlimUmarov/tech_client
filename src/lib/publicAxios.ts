import axios from 'axios'
export const baseUrl = import.meta.env.VITE_APP_BASE_URL

export const publicAxios = axios.create({
    baseURL: baseUrl
})