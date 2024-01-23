<template>
  <div class="wrapper mt-16">
    <div class="grid grid-cols-1 md:grid-cols-4 space-x-3">
      <ProductsListProductItem />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main-layout",
});
</script>
