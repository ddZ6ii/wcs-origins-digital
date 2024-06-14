import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getStats = () => {
  const controller = new AbortController();
  return axios.get(`${BASE_URL}/admin/stats`, { signal: controller.signal });
};

export const getVideos = () => {
  const controller = new AbortController();
  return axios.get(`${BASE_URL}/admin/videos`, { signal: controller.signal });
};
