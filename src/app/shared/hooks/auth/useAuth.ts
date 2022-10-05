import { api } from '../../../../config/api';

const useAuth = () => ({
  validateToken: async (token: string) => {
    // with mock
    if (import.meta.env.VITE_MOCK_ON === 'true') {
      return {
        user: {},
      };
    }
    //
    const response = await api.get('/auth/me', {
      headers: { Authorization: 'Bearer ' + token },
    });
    return {
      user: response.data,
    };
  },

  signin: async (body: {}): Promise<{}> => {
    const response = await api.post('/auth/signin', body);
    return response.data;
  },

  logout: async () => {
    return { status: true };
  },
});

export { useAuth };

