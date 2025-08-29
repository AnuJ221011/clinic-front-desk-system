import api from './api';

export const doctorService = {
  async getAllDoctors(filters = {}) {
    const response = await api.get('/doctors', {
      params: filters
    });
    return response.data;
  },

  async createDoctor(doctorData) {
    const response = await api.post('/doctors', doctorData);
    return response.data;
  },

  async updateDoctor(id, doctorData) {
    const response = await api.put(`/doctors/${id}`, doctorData);
    return response.data;
  },

  async deleteDoctor(id) {
    const response = await api.delete(`/doctors/${id}`);
    return response.data;
  },
};