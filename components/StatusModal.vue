<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
  >
    <div
      class="bg-white p-6 rounded-md shadow-lg flex flex-col justify-center items-center"
    >
      <svg
        v-show="status"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#12BF6C"
        class="w-20 h-20"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>

      <svg
        v-show="!status"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#DA002B"
        class="w-20 h-20"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
        />
      </svg>

      <div class="flex flex-col justify-center items-center mt-6">
        <h2 class="text-lg font-bold mb-3">{{ message }}</h2>
        <button
          @click="$emit('closeStatusModal', false)"
          class="bg-purple hover:bg-blue-700 text-white font-semibold mt2 py-2 px-7 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  message: String,
  status: Boolean,
});
</script>
