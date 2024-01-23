<template>
  <div class="wrapper mb-20">
    <div class="flex justify-center space-x-10 mt-10 mb-10">
      <button @click="navigateTo('/profile/orders')">My Orders</button>

      <button class="font-semibold border-b">Settings</button>
    </div>

    <div class="flex justify-center space-x-10">
      <div class="flex flex-col items-start space-y-3">
        <img
          v-if="!userImage"
          class="h-60 object-contain rounded-lg"
          src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"
          alt=""
        />

        <img
          v-else="userImage"
          class="h-60 object-contain rounded-lg"
          :src="`https://eihzdapuwwdmctwiskdb.supabase.co/storage/v1/object/public/images/${id}/${userImage}`"
        />

        <div class="flex items-center justify-center">
          <label
            class="cursor-pointer bg-borderGray text-white font-medium py-2 px-4 rounded hover:bg-blue-700 transition duration-150 ease-in-out"
            :for="'file-input'"
          >
            Change image
            <input
              type="file"
              id="file-input"
              class="hidden"
              @change="uploadImage"
            />
          </label>
        </div>
      </div>

      <div class="border-2 border-gray rounded-lg p-5">
        <h1 class="text-2xl font-semibold">My information</h1>

        <form class="mt-8 space-y-5 w-[400px]">
          <div class="flex flex-col space-y-1">
            <label for="user-name">Name</label>
            <input
              class="p-3 rounded-lg border border-gray bg-grayLight outline-borderGray"
              v-model="userName"
              type="text"
            />
          </div>

          <div class="flex flex-col space-y-1">
            <label for="user-name">Email</label>
            <input
              class="p-3 rounded-lg border border-gray bg-grayLight outline-borderGray"
              v-model="userEmail"
              type="email"
            />
          </div>

          <div class="flex flex-col space-y-1">
            <label for="user-name">Password</label>
            <input
              class="p-3 rounded-lg border border-gray bg-grayLight outline-borderGray"
              v-model="userPassword"
              type="text"
            />
          </div>

          <div class="flex justify-between">
            <button
              @click="logOut"
              class="hover:bg-gray py-2 px-4 rounded-lg transition-all duration-150"
            >
              Log Out
            </button>

            <button
              @click="updateUser"
              class="bg-purple text-white py-2 px-4 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <LoadingModal v-show="loading" />
  <StatusModal
    v-show="isStatusModalOpen"
    @close-status-modal="closeStatusModal"
    :message="authMessage"
    :status="messageStatus"
  />
</template>

<script setup lang="ts">
import { useGetUserData } from "~/stores/getUserData";
import { usePutUserData } from "~/stores/putUserData";
import { useGetUserImage } from "~/stores/getUserImage";
import { v4 as uuidv4 } from "uuid";

definePageMeta({
  middleware: "auth",
  layout: "profile-layout",
});

const supabase = useSupabaseClient();
const userId = useSupabaseUser();
const id = userId.value?.id;

const uuid = uuidv4();
const store = useGetUserData();
const user = ref(store.userData[0] || {});
const storeUpdate = usePutUserData();

const image = useGetUserImage();
const userImage = ref(image.userImage);

let loading = ref(false);
let isStatusModalOpen = ref(false);
let authMessage = ref("");
let messageStatus = ref(true);

let userName = ref(user.value.user_name);
let userEmail = ref(user.value.user_email);
let userPassword = ref(user.value.user_password);

const closeStatusModal = () => {
  isStatusModalOpen.value = false;
};

const updateUser = async () => {
  loading.value = true;
  try {
    await storeUpdate.updateUserAuth(userEmail.value, userPassword.value);
    await storeUpdate.updateUserTable(
      userId.value.id,
      userName.value,
      userEmail.value,
      userPassword.value
    );

    isStatusModalOpen.value = true;
    authMessage.value = "The data has been successfully updated";
    messageStatus.value = true;
  } catch (error) {
    console.log(error);
    loading.value = false;
    isStatusModalOpen.value = true;
    authMessage.value = `${error}`;
    messageStatus.value = false;
  } finally {
    loading.value = false;
  }
};

const logOut = async () => {
  loading.value = true;
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    } else {
      isStatusModalOpen.value = true;
      authMessage.value = "You have successfully logged out of the account";
      messageStatus.value = true;
    }

    navigateTo("/");
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const uploadImage = async (event: any) => {
  const file = event.target.files[0];
  loading.value = true;
  try {
    const { data, error } = await supabase.storage
      .from("images")
      .upload(`${userId.value?.id}/${uuid}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw error;
    } else {
      isStatusModalOpen.value = true;
      messageStatus.value = true;
      authMessage.value = "The image has been successfully exposed";
    }

    console.log(data);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

watchEffect(() => {
  user.value = store.userData[0] || {};
  userImage.value = image.userImage;
  userName.value = user.value.user_name;
  userEmail.value = user.value.user_email;
  userPassword.value = user.value.user_password;
});

onMounted(() => {
  store.getUserData();
  image.getUserImageUrl();
  user.value = store.userData[0];
  userImage.value = image.userImage;
});
</script>
