<template>
  <div class="w-full h-96 bg-borderGray">
    <Swiper
      :modules="[SwiperAutoplay, SwiperEffectCreative]"
      :slides-per-view="1"
      :loop="true"
      :effect="'creative'"
      :autoplay="{
        delay: 1500,
        disableOnInteraction: true,
      }"
      :creative-effect="{
        prev: {
          shadow: false,
          translate: ['-20%', 0, -1],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      }"
    >
      <SwiperSlide>
        <h1 class="text-5xl font-bold text-center">Baner 1</h1>
      </SwiperSlide>

      <SwiperSlide>
        <h1 class="text-5xl font-bold">Baner 1</h1>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts"></script>
