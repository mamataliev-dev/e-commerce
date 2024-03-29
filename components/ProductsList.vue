<template>
  <div class="wrapper mt-16">
    <div class="grid grid-cols-4 space-x-3">
      <div
        v-for="product in products"
        :key="product.id"
        @click="openProductPage(product.id, product.title)"
        class="h-[460px] bg-white p-4 rounded-lg flex flex-col justify-start cursor-pointer"
      >
        <div class="relative">
          <img
            class="w-full h-72 object-cover"
            :src="product.preview"
            alt="Iphone"
          />

          <!-- Discount -->
          <div
            v-if="product.discount !== 0"
            class="absolute top-0 left-0 bg-red rounded-lg p-0 px-2"
          >
            <span class="text-sm font-normal text-white"
              >-{{ product.discount }}%</span
            >
          </div>

          <!-- Add to Favorite -->
          <div class="absolute top-0 right-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>
        </div>

        <div class="flex-1">
          <h2 class="text-black font-medium mt-3">{{ product.title }}</h2>

          <!-- Rating -->
          <div class="flex items-center space-x-0.5 mt-1">
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

            <span class="text-sm text-borderGray">{{
              product.ratings.average
            }}</span>
            <span class="text-sm text-borderGray"
              >({{ product.ratings.totalReviews }})</span
            >
          </div>
        </div>

        <!-- Price / Order Btn -->
        <div class="relative flex items-end justify-between space-x-6 mt-6">
          <div v-if="product.discount !== 0">
            <span class="absolute -top-6 line-through text-borderGray"
              >${{ product.price }}</span
            >
            <h2
              class="text-black text-xl font-bold bg-gold py-1 px-3 rounded-lg"
            >
              ${{ priceDiscount }}
            </h2>
          </div>

          <div v-else>
            <h2 class="text-black text-xl font-bold">${{ product.price }}</h2>
          </div>

          <button
            class="flex items-center space-x-2 py-1 px-3 rounded-lg border-2 border-purple text-purple transition ease-in-out delay-150"
          >
            <span class="font-medium">Order</span>
            <svg
              data-v-40da8b10=""
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="ui-icon add-cart-icon"
            >
              <path
                d="M8 10V8H6V12.5C6 12.7761 5.77614 13 5.5 13C5.22386 13 5 12.7761 5 12.5V7H8C8 4.59628 9.95227 3 12 3C14.0575 3 16 4.70556 16 7H19V19.5C19 20.3284 18.3284 21 17.5 21H12.5C12.2239 21 12 20.7761 12 20.5C12 20.2239 12.2239 20 12.5 20H17.5C17.7761 20 18 19.7761 18 19.5V8H16V10H15V8H9V10H8ZM12 4C10.4477 4 9 5.20372 9 7H15C15 5.29444 13.5425 4 12 4Z"
                fill="#6C35C9"
              ></path>
              <path
                d="M7.5 14C7.77614 14 8 14.2239 8 14.5V17H10.5C10.7761 17 11 17.2239 11 17.5C11 17.7761 10.7761 18 10.5 18H8V20.5C8 20.7761 7.77614 21 7.5 21C7.22386 21 7 20.7761 7 20.5V18H4.5C4.22386 18 4 17.7761 4 17.5C4 17.2239 4.22386 17 4.5 17H7V14.5C7 14.2239 7.22386 14 7.5 14Z"
                fill="#6C35C9"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import products from "~/products.json";

const priceDiscount = computed(() => {
  let dicountedPrice = ref(0);

  products.forEach((item) => {
    if (item.discount !== 0) {
      dicountedPrice.value = item.price - item.price * (item.discount / 100);
    }
  });

  return dicountedPrice;
});

const openProductPage = (id: string, title: string) => {
  navigateTo(`/product/${title.toLocaleLowerCase().split(" ").join("-")}`);
  localStorage.setItem("product-id", id);
};

onMounted(() => {});
</script>
