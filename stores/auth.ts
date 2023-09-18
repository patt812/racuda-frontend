import { defineStore } from 'pinia';
import { useCustomFetch } from '~/hooks/useCustomFetch';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: (typeof window !== 'undefined' ? localStorage.getItem('authToken') : null) || null,
    user: null,
  }),
  actions: {
    setToken(newToken: string) {
      this.token = newToken;

      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', newToken);
      }
    },
    removeToken() {
      this.token = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
      }
    },
    async fetchUser() {
      if (!this.token) return;

      const { fetcher } = useCustomFetch();
      const response = await fetcher('/user', { method: 'GET' });
      this.user = response.data;
    },
    async register(name: string, email: string, password: string) {
      const { fetcher } = useCustomFetch();
      const response = await fetcher('/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });

      if (response.error) {
        return response;
      }

      this.setToken(response.data.access_token);
      await this.fetchUser();
      return response;
    },
    async login(email: string, password: string) {
      const { fetcher } = useCustomFetch();
      const response = await fetcher('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      if (response.error) {
        return response;
      }
      this.setToken(response.data.access_token);
      await this.fetchUser();
      return response;
    },
    async logout() {
      if (!this.token) return;

      const { fetcher } = useCustomFetch();
      await fetcher('/logout', { method: 'POST' });
      this.removeToken();
      this.user = null;
    },
  },
});
