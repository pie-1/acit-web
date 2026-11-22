// src/api/funzone.js
import api from './client';

export const getMemes = async () => {
  const { data } = await api.get('/memes');
  return data;
};

export const toggleMemeUpvote = async (id) => {
  const { data } = await api.post(`/memes/${id}/upvote`);
  return data;
};

export const getGames = async (params = {}) => {
  const { data } = await api.get('/games', { params });
  return data;
};