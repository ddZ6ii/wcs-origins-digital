import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getAll = () => {
  const controller = new AbortController();
  return axios.get(`${BASE_URL}/categories`, { signal: controller.signal });
};

export const modifyById = (body, categoryId) =>
  axios.put(`${BASE_URL}/categories/${categoryId}`, body, {
    withCredentials: true,
  });

export const add = (body) =>
  axios.post(`${BASE_URL}/categories/`, body, {
    withCredentials: true,
  });

export const remove = (categoryId) =>
  axios.delete(`${BASE_URL}/categories/${categoryId}`, {
    withCredentials: true,
  });
