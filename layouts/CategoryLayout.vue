<template>
  <div class="min-h-screen flex flex-col">
    <AppHeaderNavBar />
    <AppHeaderAppCategories />

    <main class="flex-1">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>