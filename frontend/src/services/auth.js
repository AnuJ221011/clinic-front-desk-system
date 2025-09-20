import api from './api';

export const authService = {
  // REGISTER new user
  async register(userData) {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // LOGIN user
  async login(credentials) {
    const response = await api.post('/auth/login', credentials);

    // Save token + user in localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response.data;
  },

  // GET PROFILE
  async getProfile() {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  // LOGOUT
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  },

  // 🔹 GET ALL USERS (only for admins)
  async getUsers() {
    const response = await api.get('/auth/users'); // backend should protect with admin middleware
    return response.data;
  },

  // 🔹 ASSIGN ROLE (admin → update role)
  async assignRole(userId, role) {
    const response = await api.put(`/auth/assign-role/${userId}`, { role });
    return response.data;
  },
};
