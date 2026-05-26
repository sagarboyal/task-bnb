import axios from "axios";

const BACKEND_URL = "http://localhost:8080";

const api = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
    headers:{
        "Content-Type": "application/json"
    }
})

export default api;