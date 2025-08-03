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