<template>
  <section class="wrapper margin">
    <NuxtLink to="/">
      <h1 class="text-2xl font-bold">Popular Products ></h1>
    </NuxtLink>

    <div class="grid grid-cols-1 md:grid-cols-4 space-x-3 mt-5">
      <ProductTipsPopularItem />
    </div>
  </section>
</template>

<script setup lang="ts"></script>
