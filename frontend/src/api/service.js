import api from "./api";

export const register = async (email, password) => {
  const response = await api.post("/auth/register", {
    email: email,
    password: password,
  });
  return response.data;
};

export const login = async (email, password) => {
  const response = await api.post("/auth/login", {
    email: email,
    password: password,
  });
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const getLoggedInUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const createNewUser = async (formData) => {
  const response = await api.post("/user/register", {
    email: formData.email,
    password: formData.password,
    name: formData.name,
    fatherName: formData.fatherName,
    motherName: formData.motherName,
    phone: formData.phone,
    nationality: formData.nationality,
    gender: formData.gender,
    address1: formData.address1,
    address2: formData.address2,
    address3: formData.address3,
  });
  return response.data;
};

export const updateUser = async (id, formData) => {
  const response = await api.patch(`/user/update/${id}`, {
    email: formData.email,
    password: formData.password,
    name: formData.name,
    fatherName: formData.fatherName,
    motherName: formData.motherName,
    phone: formData.phone,
    nationality: formData.nationality,
    gender: formData.gender,
    address1: formData.address1,
    address2: formData.address2,
    address3: formData.address3,
  });
  return response.data;
};

export const searchUsers = async (name) => {
  const response = await api.get(`/user/suggest/${encodeURIComponent(name)}`);
  return response.data;
};

export const getUserDetails = async (id) => {
  const response = await api.get(`/user/${id}`);
  return response.data;
};

export const findUserByCode = async (code) => {
  const response = await api.get("/user", { params: { code } });
  return response.data;
};
