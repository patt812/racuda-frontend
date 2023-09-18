import { useAuthStore } from '~/stores/auth'

const auth = async () => {
  const auth = useAuthStore()

  if (!auth.token) {
    return '/login'
  }
}

export default auth
