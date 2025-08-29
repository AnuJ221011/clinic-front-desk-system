import api from './api';

export const appointmentService = {
  async getAllAppointments(date) {
    const response = await api.get('/appointments', {
      params: { date }
    });
    return response.data;
  },

  async createAppointment(appointmentData) {
    const response = await api.post('/appointments', appointmentData);
    return response.data;
  },

  async updateAppointment(id, updateData) {
    const response = await api.put(`/appointments/${id}`, updateData);
    return response.data;
  },

  async deleteAppointment(id) {
    const response = await api.delete(`/appointments/${id}`);
    return response.data;
  },
};