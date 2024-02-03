<div class="wrapper margin">
    <div class="flex items-start space-x-5">
      <div class="w-1/2">
        <Swiper
          :modules="[SwiperNavigation]"
          :slides-per-view="1"
          navigation
          :loop="true"
          :pagination="{ clickable: true }"
        >
          <SwiperSlide v-for="(image, index) in product.images[0].main">
            <img class="h-[500px] object-cover" :src="image" alt="" />
          </SwiperSlide>
        </Swiper>

        <Swiper
          :modules="[SwiperNavigation]"
          :slides-per-view="4"
          navigation
          :loop="true"
          :pagination="{ clickable: true }"
        >
          <SwiperSlide v-for="(image, index) in product.images[0].main">
            <img class="h-auto object-cover m-36" :src="image" alt="" />
          </SwiperSlide>
        </Swiper>
      </div>

      <div class="w-2/2 space-y-5">
        <div class="flex flex-col space-y-4 pb-2 border-b border-gray">
          <h1 class="text-3xl font-semibold">{{ product.title }}</h1>

          <div class="space-y-1.5">
            <div class="flex space-x-2">
              <h2 class="text-[#818181]">Seller:</h2>
              <span>{{ product.seller }}</span>
            </div>

            <div class="flex space-x-2">
              <h2 class="text-[#818181]">Ratings:</h2>
              <div class="flex items-center space-x-1 mt-1">
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
              <h2 class="text-[#818181]">Purchases:</h2>
              <span>{{ product.purchases }}</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col space-y-8">
          <!-- Storages -->
          <div class="flex flex-col items-start space-y-4">
            <div class="flex space-x-2">
              <h2 class="text-1xl text-[#818181]">Choose storage:</h2>
              <span>128GB</span>
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
              <span>Natural Titanium</span>
            </div>

            <div class="flex space-x-2">
              <div
                v-for="(color, index) in product.colors"
                :key="index"
                class="border rounded-lg py-1 px-3 cursor-pointer"
              >
                <img
                  class="w-auto h-24"
                  src="https://png.monster/wp-content/uploads/2023/09/PNG.monsterblack-apple-iphone-15-pro-max-iphone-15-pro%20png.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col space-y-1">
          <h2 class="text-1xl text-[#818181]">Price:</h2>
          <div class="flex items-center space-x-2">
            <h1
              class="text-black font-bold bg-gold py-1 px-3 rounded-lg text-2xl font-semibold"
            >
              ${{ discountPrice }}
            </h1>
            <h1 class="text-xl text-borderGray line-through">
              ${{ product.price }}
            </h1>
          </div>
        </div>

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