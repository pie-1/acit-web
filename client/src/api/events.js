// src/api/events.js
import api from './client';

export const getEvents = async (params = {}) => {
  const { data } = await api.get('/events', { params });
  return data;
};

export const createEvent = async (eventData) => {
  const { data } = await api.post('/events', eventData);
  return data;
};