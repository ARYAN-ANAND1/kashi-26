import axios from "axios";

const VITE_BACKEND_URL =  import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"

export const axiosCreate =  axios.create({
    baseURL: VITE_BACKEND_URL,
});

export const axiosPrivate = axios.create({
    baseURL: VITE_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});