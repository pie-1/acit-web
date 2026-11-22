// src/api/resources.js
import api from './client';

export const getResources = async (params = {}) => {
  const { data } = await api.get('/resources', { params });
  return data;
};