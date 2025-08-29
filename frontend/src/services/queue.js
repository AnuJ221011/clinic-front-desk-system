import api from './api';

export const queueService = {
  async getAllQueue() {
    const response = await api.get('/queue');
    return response.data;
  },

  async addToQueue(patientData) {
    const response = await api.post('/queue', patientData);
    return response.data;
  },

  async updateQueueStatus(id, status) {
    const response = await api.put(`/queue/${id}`, { status });
    return response.data;
  },

  async removeFromQueue(id) {
    const response = await api.delete(`/queue/${id}`);
    return response.data;
  },

  async clearQueue() {
    const response = await api.delete('/queue');
    return response.data;
  },
};
