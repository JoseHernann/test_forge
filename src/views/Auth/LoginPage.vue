<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')

const route = useRoute()
const router = useRouter()

const login = () => {
  if (email.value === 'aleOrozco@uanl.edu' && password.value === '123') {
    router.push({ name: 'home' })
  } else {
    error.value = 'Credenciales incorrectas'
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center relative">
    <img
      src="@/assets/img/Frame1.svg"
      alt="Background"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-white bg-opacity-50"></div>
    <div class="w-1/4 bg-opacity-0 p-8 rounded-lg shadow-lg absolute right-16">
      <h1 class="text-4xl font-bold text-gray-500 mb-6 text-center">Test Forge</h1>
      <form @submit.prevent="login" class="bg-opacity-0">
        <div class="mb-4">
          <label for="username" class="block text-gray-500 text-2xl font-medium"></label>
          <input
            v-model="email"
            type="text"
            id="username"
            name="username"
            class="w-full p-2 text-xl border border-transparent rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder="Correo"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-500 text-2xl font-medium"></label>
          <input
            v-model="password"
            type="password"
            id="password"
            name="password"
            class="w-full p-2 text-xl border border-transparent rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder="Contraseña"
          />
        </div>
        <div class="text-center">
          <button
            type="submit"
            class="w-full bg-white p-4 rounded-full text-xl text-gray-500 shadow-lg"
          >
            Iniciar sesión
          </button>
          <p class="text-red-500">{{ error }}</p>
        </div>
      </form>
    </div>
  </div>
</template>
