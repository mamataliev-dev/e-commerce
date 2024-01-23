<template>
  <div class="wrapper margin">
    <h1 class="text-2xl">{{ categoryId }}</h1>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "category-layout",
});

let categoryId: any;

if (process.client) {
  const categoryId = localStorage.getItem("category");
  console.log(categoryId);
}

useHead({
  title: `Category | ${categoryId}`,
});

if (process.client) {
  categoryId = localStorage.getItem("category");
}
</script>
