import { useAuthStore } from '~/stores/auth';

const guest = async () => {
  const auth = useAuthStore();
  if (auth.token) {
    return '/home';
  }
  return true;
};
export default guest;
