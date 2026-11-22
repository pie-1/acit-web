// src/api/team.js
import api from './client';

export const getTeamMembers = async (type = 'current') => {
  const { data } = await api.get('/team', { params: { type } });
  return data;
};