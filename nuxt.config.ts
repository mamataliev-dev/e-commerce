// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/style/main.scss"],
  // modules: ["@nuxtjs/supabase"],
  modules: ["nuxt-icon", "nuxt-swiper"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  ssr: true,
});
