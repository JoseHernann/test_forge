<script setup lang="ts">

import router from "@/router";
</script>

<template>
  <div class="flex flex-col">
    <header>
      <div>
        <h1 class="text-xl ml-10 mt-4  w-fit px-2 rounded-lg border-gradient-l bg-gradient-to-r from-red-400 to-orange-300 cursor-pointer hover:animate-bounce hover:transition-all " @click="router.push('/')">Test Forge</h1>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style scoped>

</style>