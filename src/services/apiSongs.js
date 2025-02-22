import http, { upload } from "../utils/http";
import axios from "axios";

import { API_BASE_URL } from "../utils/http";

export const getSongs = async () => {
  const response = await http.get("/api/songs");
  return response.data;
};

export const uploadSong = async ({ file, setProgress }) => {
  const formData = new FormData();
  formData.append("file", file);

  setProgress(0);

  const response = await upload.post("api/songs", formData, {
    onUploadProgress: (progressEvent) => {
      const currentProgressPercentage = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total,
      );
      const percentCompleted = Math.min(currentProgressPercentage, 95);
      setProgress(percentCompleted);
    },
  });

  return response.data;
};

export const getSongById = async (id) => {
  if (!id) return;

  const response = await http.get(`/api/songs/${id}`);
  return response.data;
};

export const updateSong = async (id, data) => {
  if (!id) return;

  const response = await http.put(`/api/songs/${id}`, data);
  return response.data;
};

export const deleteSong = async (id) => {
  if (!id) return;

  const response = await http.delete(`/api/songs/${id}`);
  return response.data;
};

export const deleteSongs = async (songsIds) => {
  if (!Array.isArray(songsIds) || songsIds.length === 0) return;

  const response = await http.post(`/api/songs/bulk-delete`, {
    ids: songsIds,
  });
  return response.data;
};

export const getStreamFile = async (id) => {
  if (!id) return;

  const response = await axios.get(`${API_BASE_URL}/api/songs/${id}/stream`);
  return response.data;
};

export const getTopSongs = async (id) => {
  if (!id) return;

  const response = await http.get(`${API_BASE_URL}/api/songs/top-songs`);
  return response.data;
};

export const getLatestSongs = async (id) => {
  if (!id) return;

  const response = await http.get(`${API_BASE_URL}/api/songs/latest-songs`);
  return response.data;
};

