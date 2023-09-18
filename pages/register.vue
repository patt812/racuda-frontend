<script setup lang="ts">
  import { useAuthStore } from '~/stores/auth';

  definePageMeta({
    middleware: 'guest',
  });

  const router = useRouter();
  const auth = useAuthStore();

  const registerData = ref({
    name: '',
    email: '',
    password: '',
  });

  const errorBag = ref({ ...registerData.value });

  const register = async () => {
    const res = await auth.register(
      registerData.value.name,
      registerData.value.email,
      registerData.value.password
    );
    errorBag.value.name = res.error?.name?.[0] ?? '';
    errorBag.value.email = res.error?.email?.[0] ?? '';
    errorBag.value.password = res.error?.password?.[0] ?? '';

    if (auth.token) {
      router.push('/home');
    }
  };
</script>

<template>
  <div>register</div>

  <form @submit.prevent="register">
    <input id="name" v-model="registerData.name" type="text" name="name" placeholder="name" />
    <div>{{ errorBag.name }}</div>
    <input
      id="email"
      v-model="registerData.email"
      type="text"
      name="email"
      placeholder="email"
      autocomplete="off"
    />
    <div>{{ errorBag.email }}</div>
    <input
      id="password"
      v-model="registerData.password"
      type="password"
      name="password"
      placeholder="password"
      autocomplete="off"
    />
    <div>{{ errorBag.password }}</div>
    <button type="submit">register</button>
  </form>

  <br />
  <NuxtLink href="/login"> login </NuxtLink>
  <br />
  <NuxtLink href="/home"> home </NuxtLink>
</template>
