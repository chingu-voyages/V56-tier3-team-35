import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export const getAllPatients = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/patients`);
        return response.data;
    } catch (error) {
        console.error('Error fetching patients:', error);
        throw error;
    }
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createPatientApi = async (data: any) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/patients`, data);
        return response.data;
    } catch (error) {
        console.error('Error creating patient:', error);
        throw error;
    }
};