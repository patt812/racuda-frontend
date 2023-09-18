<script setup lang="ts">
  import { useAuthStore } from '~/stores/auth';

  definePageMeta({
    middleware: 'auth',
  });

  const router = useRouter();
  const auth = useAuthStore();
  auth.fetchUser();

  const logout = async () => {
    await auth.logout();

    if (auth.token === null) {
      router.push('/login');
    }
  };
</script>

<template>
  <div>home</div>

  <div>{{ auth.user }}</div>

  <button @click="logout">logout</button>

  <div>
    <NuxtLink to="/login"> login </NuxtLink>
  </div>
</template>
