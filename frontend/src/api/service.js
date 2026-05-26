import api from "./api";

export const register = async(email, password) => {
    const response = await api.post("/auth/register", {
        "email": email,
        "password": password
    });
    return response.data;
}

export const login = async(email, password) => {
    const response = await api.post("/auth/login", {
        "email": email,
        "password": password
    });
    return response.data;
}

export const getLoggedInUser = async() => {
    const response = await api.get("/auth/me");
    return response.data;
}