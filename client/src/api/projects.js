// src/api/projects.js
import api from './client';

export const getProjects = async (params = {}) => {
  const { data } = await api.get('/projects', { params });
  return data;
};