import axios, { AxiosResponse } from "axios"

axios.defaults.withCredentials = true

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export const loginUser = async(email: string, password: string) => {
    try {
        const response: AxiosResponse<unknown> = await axios.post(`${BACKEND_URL}/api/auth/login`, {email, password});
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error occurred ${error}`)
    }
}

export const checkAuth = async() => {
    try {
        const response: AxiosResponse<unknown> = await axios.get(`${BACKEND_URL}/api/auth/check-auth`);
        return response.status === 200;
    } catch (error) {
        console.log(error);
        throw new Error(`Error occurred ${error}`)
    }
}

export const Logout = async() => {
    try {
        const response: AxiosResponse<unknown> = await axios.post(`${BACKEND_URL}/api/auth/logout`);
        return response.status === 200;
    } catch (error) {
        console.log(error);
        throw new Error(`Error occurred ${error}`)
    }
}