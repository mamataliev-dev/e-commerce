<template>
  <div class="wrapper margin">
    <div class="flex items-center space-x-10 justify-center">
      <div
        @click="openCategoryPage('laptops')"
        class="flex flex-col items-center justify-center cursor-pointer"
      >
        <div class="category-card_box">
          <img
            class="category-card_img"
            src="~/assets/image-category/Macbook.png"
            alt=""
          />
        </div>

        <span class="category-card_title">Laptops</span>
      </div>

      <div
        @click="openCategoryPage('phones')"
        class="flex flex-col items-center justify-center cursor-pointer"
      >
        <div class="category-card_box">
          <img
            class="category-card_img"
            src="~/assets/image-category/iPhone.png"
            alt=""
          />
        </div>

        <span class="category-card_title">Phones</span>
      </div>

      <div
        @click="openCategoryPage('pc')"
        class="flex flex-col items-center justify-center cursor-pointer"
      >
        <div class="category-card_box">
          <img
            class="category-card_img"
            src="~/assets/image-category/pc.png"
            alt=""
          />
        </div>

        <span class="category-card_title">PC</span>
      </div>

      <div
        @click="openCategoryPage('accesories')"
        class="flex flex-col items-center justify-center cursor-pointer"
      >
        <div class="category-card_box">
          <img
            class="category-card_img"
            src="~/assets/image-category/airpods.png"
            alt=""
          />
        </div>

        <span class="category-card_title">Accesories</span>
      </div>

      <div
        @click="openCategoryPage('tablets')"
        class="flex flex-col items-center justify-center cursor-pointer"
      >
        <div class="category-card_box">
          <img
            class="category-card_img"
            src="~/assets/image-category/ipad.png"
            alt=""
          />
        </div>

        <span class="category-card_title">Tablets</span>
      </div>

      <div
        @click="openCategoryPage('watches')"
        class="flex flex-col items-center justify-center cursor-pointer"
      >
        <div class="category-card_box">
          <img
            class="category-card_img"
            src="~/assets/image-category/watch.png"
            alt=""
          />
        </div>

        <span class="category-card_title">Watches</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const openCategoryPage = (category: string) => {
  saveCategoryToLocalStorage(category);
  setPageLayout("category-layout");
  router.push(`/category/${category}`);
};

const saveCategoryToLocalStorage = (category: string) => {
  localStorage.setItem("category", category);
};
</script>
