<template>
  <div class="wrapper">
    <div class="flex justify-center items-center">
      <h1 class="text-2xl font-bold">Please, confirm your email!</h1>

      <NuxtLink to="https://mail.google.com/">
        <button class="py-2 px-4 roundedn-lg bg-purple text-white">
          Confirm
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth-layout",
});

const user = useSupabaseUser();

watch(
  user,
  () => {
    if (user.value) {
      return navigateTo("/");
    }
  },
  { immediate: true }
);
</script>
