<template>
  <nav class="relative bg-main h-16 text-white p-2">
    <div class="wrapper">
      <div class="flex items-center justify-between">
        <NuxtLink to="/">
          <h1 class="text-2xl font-bold">Logo</h1>
        </NuxtLink>

        <div class="flex items-center space-x-3">
          <form @submit.prevent="searchProduct" class="flex items-center">
            <input
              v-model="query"
              class="w-[500px] rounded-tl-md rounded-bl-md py-2 px-3.5 outline-none text-black"
              type="text"
              placeholder="Search product..."
            />
            <button class="bg-gray py-2 px-5 rounded-tr-md rounded-br-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="gray"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </form>
        </div>

        <ul class="flex items-center space-x-3">
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </li>

          <li>
            <NuxtLink to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </NuxtLink>
          </li>

          <li>
            <NuxtLink to="/profile/orders">
              <div class="flex items-center space-x-2">
                <img
                  class="h-8 object-contain rounded-lg"
                  :src="
                    userImage
                      ? `https://eihzdapuwwdmctwiskdb.supabase.co/storage/v1/object/public/images/${id}/${userImage}`
                      : 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg'
                  "
                  alt=""
                />

                <span>{{ userId ? `${userDisplayName}` : "Sign up" }}</span>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useGetUserData } from "~/stores/getUserData";
import { useGetUserImage } from "~/stores/getUserImage";
import { usePutAddUserDate } from "~/stores/putAddUserData";

const searchProduct = () => {
  console.log("query");
};

const userData = usePutAddUserDate();
const userId = useSupabaseUser();
const id = userId.value?.id;
const store = useGetUserData();
const user = ref(store.userData[0] || {});
const userDisplayName = ref(user.value.user_name);

const image = useGetUserImage();
const userImage = ref(image.userImage);

watchEffect(() => {
  user.value = store.userData[0] || {};
  userImage.value = image.userImage;
  userDisplayName.value = user.value.user_name;
});

onMounted(() => {
  store.getUserData();
  user.value = store.userData[0];
  image.getUserImageUrl();
  userImage.value = image.userImage;
  userData.addUserData();
});
</script>
