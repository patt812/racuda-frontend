<script setup lang="ts">
  useHead({
    bodyAttrs: {
      class: '!bg-main scroll-bar',
    },
  });
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>
