<template>
  <div class="wrapper table">
    <div
      class="my-20 mx-auto bg-white rounded-lg w-[350px] md:w-[500px] px-4 py-6"
    >
      <div class="flex items-center justify-center">
        <div class="w-full bg-gray h-0.5"></div>
        <h1 class="text-2xl md:text-3xl font-bold text-center w-full">
          Sign Up
        </h1>
        <div class="w-full bg-gray h-0.5"></div>
      </div>

      <form class="flex flex-col mt-8" @submit.prevent="SignUp">
        <div class="flex flex-col space-y-1">
          <label for="user-name">User name</label>
          <input
            class="p-3 rounded-lg bg-grayLight outline-borderGray"
            v-model="userName"
            type="text"
            placeholder="John"
          />
          <span v-show="nameEmpty" class="text-red"
            >Please enter your name</span
          >
        </div>

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
          Sign Up
        </button>
      </form>

      <div class="w-full bg-gray h-0.5 mt-8"></div>

      <div class="flex mt-4 justify-center space-x-1">
        <span class="text-sm">Already have an account?</span>
        <button @click="openLogIn" class="text-sm text-[#0000FF] font-semibold">
          Log In
        </button>
      </div>
    </div>
  </div>

  <LoadingModal v-show="loading" />
</template>

<script setup lang="ts">
import { usePutAddUserDate } from "~/stores/putAddUserData";

definePageMeta({
  layout: "auth-layout",
});

const store = usePutAddUserDate();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

let loading = ref(false);

let userEmail = ref("");
let userPassword = ref("");
let userName = ref("");

let emailEmpty = ref(false);
let passwordEmpty = ref(false);
let nameEmpty = ref(false);

const openLogIn = () => navigateTo("/login");

watchEffect(() => {
  if (user.value) {
    navigateTo("/profile/settings");
  }
});

const SignUp = async () => {
  loading.value = true;
  try {
    emailEmpty.value = false;
    passwordEmpty.value = false;
    nameEmpty.value = false;

    if (userName.value === "") {
      nameEmpty.value = true;
      return;
    }
    if (userEmail.value === "") {
      emailEmpty.value = true;
      return;
    }
    if (userPassword.value === "") {
      passwordEmpty.value = true;
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: userEmail.value,
      password: userPassword.value,
      options: {
        emailRedirectTo: "/confirm",
      },
    });

    if (error) {
      throw error;
    }

    store.saveUserData(userName.value, userEmail.value, userPassword.value);

    navigateTo("/confirm");

    userName.value = "";
    userEmail.value = "";
    userPassword.value = "";
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>
