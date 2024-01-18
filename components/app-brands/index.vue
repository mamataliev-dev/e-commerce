<template>
  <section class="wrapper margin">
    <NuxtLink to="/">
      <h1 class="text-2xl font-bold">Brands ></h1>
    </NuxtLink>

    <div class="grid grid-cols-4 space-x-4 mt-5">
      <AppBrandsBrandItem />
    </div>
  </section>
</template>

<script setup lang="ts"></script>
