import api from '../lib/axios';

export const profileService = {
  get: async () => {
    const resp = await api.get('/users/me');
    return resp.data;
  },

  update: async (data: any) => {
    const resp = await api.put('/users/me', data);
    return resp.data;
  },
};

export default profileService;
