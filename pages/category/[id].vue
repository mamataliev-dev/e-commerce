<template>
  <div class="wrapper margin">
    <h1 class="text-2xl">{{ categoryId }}</h1>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "category-layout",
});

let categoryId: any = null;

if (process.client) {
  categoryId = localStorage.getItem("category");
}

useHead({
  title: `Category | ${categoryId}`,
});
</script>
