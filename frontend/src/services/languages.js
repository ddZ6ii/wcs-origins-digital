import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getAll = () => {
  const controller = new AbortController();
  return axios.get(`${BASE_URL}/languages`, { signal: controller.signal });
};

export const modifyById = (body, languageId) =>
  axios.put(`${BASE_URL}/languages/${languageId}`, body, {
    withCredentials: true,
  });

export const add = (body) =>
  axios.post(`${BASE_URL}/languages/`, body, {
    withCredentials: true,
  });

export const remove = (languageId) =>
  axios.delete(`${BASE_URL}/languages/${languageId}`, {
    withCredentials: true,
  });
