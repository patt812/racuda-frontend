import { ref, Ref } from "vue";
import { useAuthStore } from "~/stores/auth";

export const useCustomFetch = () => {
  const auth = useAuthStore();
  const isLoading = ref(false);
  const error: Ref<any | null> = ref(null);

  const fetcher = async (path: string, options: RequestInit = {}) => {
    isLoading.value = true;
    error.value = null;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (auth.token) {
      headers['Authorization'] = `Bearer ${auth.token}`;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api${path}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return { code: response.status, error: data || 'An error occurred' };
      }

      return { code: response.status, data };
    } catch (err) {
      error.value = err;
      return { code: 500, error: err || 'An error occurred' };
    } finally {
      isLoading.value = false;
    }
  };

  return { fetcher, isLoading, error };
};
