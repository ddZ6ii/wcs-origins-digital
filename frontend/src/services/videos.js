import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getVideos = () => {
  const controller = new AbortController();
  return axios.get(`${BASE_URL}/videos`, { signal: controller.signal });
};

export const getById = (videoId) => {
  const controller = new AbortController();
  return axios.get(
    `${BASE_URL}/videos/${videoId}`,
    { withCredentials: true },
    { signal: controller.signal }
  );
};

export const getCount = async (videoId) => {
  const { data: videos } = await getById(videoId);
  return videos.length;
};

export const getAllByLanguage = (languageId) => {
  const controller = new AbortController();
  return axios.get(
    `${BASE_URL}/videos/languages/${languageId}`,
    { withCredentials: true },
    { signal: controller.signal }
  );
};

export const getCountByLanguage = async (languageId) => {
  const { data: videos } = await getAllByLanguage(languageId);
  return videos.length;
};

export const getAllByGame = (gameId) => {
  const controller = new AbortController();
  return axios.get(
    `${BASE_URL}/videos/games/${gameId}`,
    { withCredentials: true },
    { signal: controller.signal }
  );
};

export const getCountByGame = async (gameId) => {
  const { data: videos } = await getAllByGame(gameId);
  return videos.length;
};

export const getAllByCategory = (categoryId) => {
  const controller = new AbortController();
  return axios.get(
    `${BASE_URL}/videos/categories/${categoryId}`,
    { withCredentials: true },
    { signal: controller.signal }
  );
};

export const getCountByCategory = async (categoryId) => {
  const { data: videos } = await getAllByCategory(categoryId);
  return videos.length;
};

export const getFavoriteVideos = (userId) => {
  const controller = new AbortController();
  return axios.get(`${BASE_URL}/user-video/${userId}`, {
    signal: controller.signal,
  });
};

export const modifyById = (body, videoId) =>
  axios.put(`${BASE_URL}/videos/${videoId}`, body, {
    withCredentials: true,
  });

export const unfavoriteVideo = (videoId, userId) => {
  return axios.put(
    `${BASE_URL}/user-video/`,
    {
      user_id: userId,
      video_id: videoId,
      is_favorite: 0,
    },
    {
      withCredentials: true,
    }
  );
};

export const addThumbnail = (form) =>
  axios.post(`${BASE_URL}/upload/thumbnails/videos`, form, {
    withCredentials: true,
  });

export const addMedia = (form) =>
  axios.post(`${BASE_URL}/upload/videos`, form, {
    withCredentials: true,
  });

export const add = (body) =>
  axios.post(`${BASE_URL}/videos/`, body, {
    withCredentials: true,
  });

export const remove = (videoId) =>
  axios.delete(`${BASE_URL}/videos/${videoId}`, {
    withCredentials: true,
  });

export const addVideoCategory = (body) =>
  axios.post(`${BASE_URL}/video-category/`, body, {
    withCredentials: true,
  });

export const deleteVideoCategory = (id) =>
  axios.delete(`${BASE_URL}/video-category/${id}`, {
    withCredentials: true,
  });

export const deleteThumbnail = (data) =>
  axios.delete(`${BASE_URL}/upload/thumbnails/videos`, {
    ...data,
    withCredentials: true,
  });

export const deleteMedia = (data) =>
  axios.delete(`${BASE_URL}/upload/videos`, {
    ...data,
    withCredentials: true,
  });
