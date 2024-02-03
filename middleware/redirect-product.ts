export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === "/product") {
    return navigateTo("/");
  }
});
