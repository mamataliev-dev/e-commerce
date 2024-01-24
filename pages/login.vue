<template>
  <div class="wrapper">
    <div class="m-auto my-20 bg-white rounded-lg w-[500px] px-4 py-6">
      <div class="flex items-center justify-center">
        <div class="w-full bg-gray h-0.5"></div>
        <h1 class="text-3xl font-bold text-center w-full">Log In</h1>
        <div class="w-full bg-gray h-0.5"></div>
      </div>

      <form class="flex flex-col mt-8" @submit.prevent="LogIn">
        <div class="mt-6 flex flex-col space-y-1">
          <label for="user-email">Email address</label>
          <input
            class="p-3 rounded-lg bg-grayLight outline-borderGray"
            v-model="userEmail"
            type="email"
            placeholder="johnsmith@gmail.com"
          />
          <span v-show="emailEmpty" class="text-red"
            >Please enter your email</span
          >
        </div>

        <div class="mt-6 flex flex-col space-y-1">
          <label for="user-email">Password</label>
          <input
            class="p-3 rounded-lg bg-grayLight outline-borderGray"
            v-model="userPassword"
            type="password"
            placeholder="******"
          />
          <span v-show="passwordEmpty" class="text-red"
            >Please enter your password</span
          >
        </div>

        <button class="mt-8 py-2 bg-purple rounded-lg text-white text-lg">
          Log In
        </button>
      </form>

      <div class="w-full bg-gray h-0.5 mt-8"></div>

      <div class="flex mt-4 justify-center space-x-1">
        <span class="text-sm">Don't have an account?</span>
        <button @click="openLogIn" class="text-sm text-[#0000FF] font-semibold">
          Sign Up
        </button>
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
definePageMeta({
  layout: "auth-layout",
});

const supabase = useSupabaseClient();
const user = useSupabaseUser();

let isStatusModalOpen = ref(false);
let messageStatus = ref(true);
let authMessage = ref("");
let loading = ref(false);

let userEmail = ref("");
let userPassword = ref("");
let emailEmpty = ref(false);
let passwordEmpty = ref(false);

watchEffect(() => {
  if (user.value) {
    navigateTo("/profile/settings");
  }
});

const openLogIn = () => navigateTo("/signup");

const closeStatusModal = (isOpen: boolean) => {
  isStatusModalOpen.value = isOpen;
};

const LogIn = async () => {
  loading.value = true;

  try {
    emailEmpty.value = false;
    passwordEmpty.value = false;

    if (userEmail.value === "") {
      emailEmpty.value = true;
      return;
    }

    if (userPassword.value === "") {
      passwordEmpty.value = true;
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: userEmail.value,
      password: userPassword.value,
    });

    if (error) {
      isStatusModalOpen.value = true;
      authMessage.value = "Invalid Email or Password";
      userEmail.value = "";
      userPassword.value = "";
      messageStatus.value = false;

      console.log(error);
    } else {
      isStatusModalOpen.value = true;
      authMessage.value = "Sign Up was successful";
      messageStatus.value = true;
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>
