<template>
  <div class="wrapper margin">
    <div class="flex items-start justify-center space-x-5">
      <div class="w-1/2">
        <Swiper
          :modules="[SwiperNavigation]"
          :slides-per-view="1"
          navigation
          :loop="true"
          :pagination="{ clickable: true }"
        >
          <SwiperSlide v-for="(image, index) in displayedImages" :key="index">
            <img class="h-[550px] object-cover m-auto" :src="image" alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
 
      <div class="w-2/2 space-y-5">
        <div class="flex flex-col space-y-4 pb-2 border-b border-gray">
          <h1 class="text-3xl font-semibold leading-normal max-w-[358px]">
            {{ product.title }}
          </h1>

          <div class="w-auto flex items-center space-x-5">
            <div class="flex items-center space-x-2">
              <h2 class="text-[#818181]">Ratings:</h2>
              <div class="flex items-center space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clip-rule="evenodd"
                    fill="#F5A623"
                  />
                </svg>

                <span class="text-sm">{{ product.ratings.average }}</span>
                <span class="text-sm"
                  >({{ product.ratings.totalReviews }})</span
                >
              </div>
            </div>

            <div class="flex space-x-2">
              <h2 class="text-[#818181]">Brand:</h2>
              <span>{{ product.brand }}</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col space-y-8">
          <!-- Storages -->
          <div class="flex flex-col items-start space-y-4">
            <div class="flex space-x-2">
              <h2 class="text-1xl text-[#818181]">Choose storage:</h2>
              <span>{{ storage }}</span>
            </div>

            <div class="flex space-x-2">
              <div
                v-for="(storage, index) in product.storages"
                :key="index"
                class="border rounded-lg py-1 px-3"
              >
                {{ storage }}
              </div>
            </div>
          </div>

          <!-- Colors -->
          <div class="flex flex-col items-start space-y-4">
            <div class="flex space-x-2">
              <h2 class="text-1xl text-[#818181]">Choose color:</h2>
              <span>{{ capitalizeFirstWord(color) }}</span>
            </div>

            <div class="flex space-x-2">
              <div
                v-for="(option, index) in colorOptions"
                :key="index"
                class="border rounded-lg py-1 px-3 cursor-pointer"
                :class="{
                  'border-2 border-purple': selectedColor === option.color,
                  border: selectedColor !== option.color,
                }"
                @click="(selectedColor = option.color), (color = option.color)"
              >
                <img
                  class="w-auto h-16"
                  :src="option.imageUrl"
                  :alt="`${option.color} color`"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Price -->
        <div class="flex flex-col space-y-1">
          <h2 class="text-1xl text-[#818181]">Price:</h2>
          <div
            v-if="product.discountPrice !== 0"
            class="flex items-center space-x-2"
          >
            <h1
              class="text-black font-bold bg-gold py-1 px-3 rounded-lg text-2xl"
            >
              ${{ priceDiscount }}
            </h1>
            <h1 class="text-xl text-borderGray line-through">
              ${{ product.price }}
            </h1>
          </div>

          <div v-else class="flex items-center space-x-2">
            <h1 class="text-black text-2xl font-bold">${{ product.price }}</h1>
          </div>
        </div>

        <!-- Order btn -->
        <div class="flex space-x-2 items-center">
          <button class="w-1/2 py-3 bg-purple rounded-lg text-white">
            Add to card
          </button>
          <button class="w-1/2 py-3 border rounded-lg">Buy in one click</button>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-start space-y-4 mt-20">
      <button class="text-xl font-semibold text-purple">
        Product Description
      </button>

      <p class="text-[#999] w-[700px]">{{ product.description }}</p>
    </div>
  </div>

  <SimilarProducts />

  <RecentlyViewed />
</template>

<script setup lang="ts">
import products from "~/products.json";

definePageMeta({
  layout: "product-layout",
});

let productId: string | null = null;
if (process.client) productId = localStorage.getItem("product-id");

let product = reactive({
  title: "",
  description: "",
  brand: "",
  price: 0,
  discountPrice: 0,
  images: [],
  storages: [],
  colors: [],
  purchases: 0,
  ratings: {
    average: 0,
    totalReviews: 0,
  },
});

let storage = ref("256GB");
let color = ref("Gray");
const selectedColor = ref("gray");

const displayedImages = computed(() => {
  const imagesByColor = product.images.find(
    (image) => image[selectedColor.value]
  );
  return imagesByColor ? imagesByColor[selectedColor.value] : [];
});

const colorOptions = computed(() => {
  return product.images.map((colorObject) => {
    const colorName = Object.keys(colorObject)[0];
    const imageUrl = colorObject[colorName][0];
    return { color: (color.value = colorName), imageUrl };
  });
});

const priceDiscount = computed(() => {
  let dicountedPrice = ref(0);

  products.forEach((item) => {
    if (item.discount !== 0) {
      dicountedPrice.value = item.price - item.price * (item.discount / 100);
    }
  });

  return dicountedPrice;
});

const capitalizeFirstWord = (str) => {
  return str
    .split(" ")
    .map(
      (word, index) =>
        index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word // Capitalize the first word only
    )
    .join(" ");
};

useHead({
  title: `${product.title}`,
});

onMounted(() => {
  products.forEach((item) => {
    if (item.id == productId) {
      Object.assign(product, {
        title: item.title,
        description: item.description,
        price: item.price,
        brand: item.brand,
        discountPrice: item.discount,
        images: item.images,
        storages: item.storages,
        colors: item.colors,
        purchases: item.purchases,
        ratings: item.ratings,
      });
    }
  });
});
</script>
