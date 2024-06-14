import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getUsers = () => {
  const controller = new AbortController();
  return axios.get(`${BASE_URL}/users`, { signal: controller.signal });
};

export const getUserStats = (userId) => {
  const controller = new AbortController();
  return axios.get(`${BASE_URL}/users/stats/${userId}`, {
    signal: controller.signal,
  });
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

export const retrieveUserInfo = (userId) => {
  return axios.get(`${BASE_URL}/users/${userId}`, {
    withCredentials: true,
  });
};
