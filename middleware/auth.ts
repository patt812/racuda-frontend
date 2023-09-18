import { useAuthStore } from '~/stores/auth';

const auth = async () => {
  const authStore = useAuthStore();

  if (!authStore.token) {
    return '/login';
  }
  return true;
};

export default auth;
