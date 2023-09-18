<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

definePageMeta({
    middleware: 'guest'
})

const router = useRouter()
const auth = useAuthStore()

const loginData = ref({
    email: '',
    password: ''
})

const errorBag = ref({...loginData.value})

const login = async () => {
    const response = await auth.login(loginData.value.email, loginData.value.password)
    errorBag.value.email = response.error?.email?.[0] ?? ''
    errorBag.value.password = response.error?.password?.[0] ?? ''

    if (auth.user) {
        router.push('/home');
    }
}
</script>

<template>
    <div>login</div>

    <form @submit.prevent="login">
        <input type="text" name="email" placeholder="email" v-model="loginData.email" autocomplete="email">
        <div>{{ errorBag.email }}</div>
        <input type="password" name="password" placeholder="password" v-model="loginData.password" autocomplete="current-password">
        <div>{{ errorBag.password }}</div>
        <button type="submit">login</button>
    </form>

    <br>
    <NuxtLink href="/register">register</NuxtLink>
    <br>
    <NuxtLink href="/home">home</NuxtLink>
</template>
