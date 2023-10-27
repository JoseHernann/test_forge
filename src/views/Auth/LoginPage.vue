<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')

const router = useRouter()

const login = () => {
  if (email.value === 'aleOrozco@uanl.edu' && password.value === '123') {
    router.push({ name: 'home' })
  } else {
    if (!email.value || !password.value) {
      error.value = 'Por favor, completa ambos campos.'
    } else {
      error.value = 'Credenciales incorrectas'
    }
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center relative">
    <img src="@/assets/img/Frame1.svg" alt="Background" class="absolute inset-0 object-cover" />
    <div class="absolute inset-0 bg-white bg-opacity-50 backdrop-blur-sm"></div>

    <div class="w-1/3 bg-opacity-0 p-8 absolute right-20">
      <div class="flex items-center">
        <h1 class="text-4xl font-poppins text-gray-500 text-center">Test Forge</h1>
        <img src="/src/assets/img/hammer.svg" alt="SVG" class="ml-4" />
      </div>
      <form @submit.prevent="login" class="bg-opacity-0">
        <div class="mb-6">
          <label for="username" class="block text-gray-500 text-2xl font-poppins mb-2"
            >Correo</label
          >
          <input
            v-model="email"
            type="text"
            id="username"
            name="username"
            class="w-full p-2 text-xl border border-transparent rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-500 text-2xl font-poppins mb-2"
            >Contraseña</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            name="password"
            class="w-full p-2 text-xl border border-transparent rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>
        <div class="text-center">
          <button
            class="w-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-lg font-medium text-gray-900 rounded-full group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800"
          >
            <span
              class="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0"
            >
              Iniciar sesión
            </span>
          </button>

          <p class="text-red-500">{{ error }}</p>
        </div>
      </form>
    </div>
  </div>
</template>
