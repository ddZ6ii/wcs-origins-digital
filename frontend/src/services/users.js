import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getUsers = (controller) => {
  const { signal } = controller;
  return axios.get(`${BASE_URL}/users`, { signal });
};

export const getUserStats = (controller, userId) => {
  const { signal } = controller;
  return axios.get(`${BASE_URL}/users/stats/${userId}`, { signal });
};

export const login = (credentials) => {
  return axios.post(`${BASE_URL}/auth/login`, credentials, {
    withCredentials: true,
  });
};

export const logout = () => {
  return axios.get(`${BASE_URL}/auth/logout`, {
    withCredentials: true,
  });
};

export const register = (userInfo) => {
  return axios.post(`${BASE_URL}/users`, userInfo, {
    withCredentials: true,
  });
};
