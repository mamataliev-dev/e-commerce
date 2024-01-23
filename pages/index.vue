<template>
  <div class="wrapper">
    <AppBaner />

    <AppCategories />

    <main>
      <ProductsList />

      <ProductTips />

      <AppBrands />

      <SimilarProducts />

      <RecentlyViewed />
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});
</script>
