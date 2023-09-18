<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

definePageMeta({
    middleware: 'guest'
})

const router = useRouter()
const auth = useAuthStore()

const registerData = ref({
    name: '',
    email: '',
    password: ''
})

const errorBag = ref({...registerData.value})

const register = async () => {
    const res = await auth.register(registerData.value.name, registerData.value.email, registerData.value.password)
    errorBag.value.name = res.error?.name?.[0] ?? ''
    errorBag.value.email = res.error?.email?.[0] ?? ''
    errorBag.value.password = res.error?.password?.[0] ?? ''

    if (auth.token) {
        router.push('/home')
    }
}
</script>

<template>
    <div>register</div>

    <form @submit.prevent="register">
        <input type="text" name="name" id="name" placeholder="name" v-model="registerData.name">
        <div>{{ errorBag.name }}</div>
        <input type="text" name="email" id="email" placeholder="email" v-model="registerData.email" autocomplete="off">
        <div>{{ errorBag.email }}</div>
        <input type="password" name="password" id="password" placeholder="password" v-model="registerData.password" autocomplete="off">
        <div>{{ errorBag.password }}</div>
        <button type="submit">register</button>
    </form>

    <br>
    <NuxtLink href="/login">login</NuxtLink>
    <br>
    <NuxtLink href="/home">home</NuxtLink>
</template>