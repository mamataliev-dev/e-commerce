<template>
  <div class="min-h-screen flex flex-col">
    <AuthHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
