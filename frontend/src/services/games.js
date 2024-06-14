import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getAll = () => {
  const controller = new AbortController();
  return axios.get(`${BASE_URL}/games`, { signal: controller.signal });
};

export const getByName = (gameName) => {
  const controller = new AbortController();
  return axios.get(`${BASE_URL}/games?name=${gameName}`, {
    signal: controller.signal,
  });
};

export const modifyById = (body, id) => {
  return axios.put(`${BASE_URL}/games/${id}`, body, {
    withCredentials: true,
  });
};

export const addThumbnail = (form) => {
  return axios.post(`${BASE_URL}/upload/thumbnails/games`, form, {
    withCredentials: true,
  });
};

export const add = (body) =>
  axios.post(`${BASE_URL}/games`, body, {
    withCredentials: true,
  });

export const remove = (id) =>
  axios.delete(`${BASE_URL}/games/${id}`, {
    withCredentials: true,
  });

export const deleteThumbnail = (data) =>
  axios.delete(`${BASE_URL}/upload/thumbnails/games`, {
    ...data,
    withCredentials: true,
  });
