<script setup lang="ts">
import {
  ChevronRightIcon,
  BuildingLibraryIcon,
  UserCircleIcon,
  DocumentTextIcon
} from '@heroicons/vue/24/outline'
import { computed, onBeforeMount, onMounted, reactive, ref, watch } from 'vue'
import { db } from '../services/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

const step = ref(1)

const isMounted = ref(false)
const examen = reactive({
  name: '',
  school: '',
  teacher: '',
  subject: '',
  theme: ''
})
const materias = ref(['Español', 'Matematicas', 'Ciencias Naturales', 'Fisica'])

const themes = ref<Array<string>>([])

async function getThemes() {
  const qs = await getDocs(query(collection(db, examen.subject)))
  // query(db, collection(db, "themes"), where("subject", "==", examen.subject));
  qs.forEach((doc) => {
    themes.value.push(doc.data().Tema)
  })
}
</script>

<template>
  <div
    class="flex flex-col gap-10 z-10 justify-center items-center absolute w-screen h-screen bg-black/80"
    v-if="isMounted == false"
  >
    <div class="flex flex-col items-center">
      <h1 class="text-4xl text-center w-fit px-10 py-4 rounded-t-3xl text-white bg-pink-500">
        Asistente
      </h1>
      <div class="bg-pink-500 rounded-xl p-2 z-[1]">
        <p class="text-center text-white text-xl">
          Te guiaremos paso a paso para que puedas crear un examen con tus propias preguntas
        </p>
      </div>
    </div>
    <div class="text-white flex flex-col gap-8 directions">
      <p class="flex flex-col">
        1. Escribe el nombre de tu examen 📄
        <span class="ml-10">💭Recomendamos aqui pongas el tema del cual se tratara</span>
      </p>
      <p class="flex flex-col">
        2. Datos de identificación 🪪
        <span class="ml-10 flex flex-col"
          >💭Podras poner tu escuela o dependencia<br />
          💭El nombre del maestro <br />
          💭La materia
        </span>
      </p>
      <p class="flex flex-col">
        3. Selecciona el tema ➕
        <span class="ml-10 flex flex-col">
          💭 Elige entre nuestros temas disponibles los cuales tendran una gran cantidad de
          preguntas</span
        >
      </p>
      <p class="flex flex-col">4. Visualiza tu examen 👁️</p>
      <p class="flex flex-col">
        5. Si todo esta correcto ✅ ¡Descargalo en PDF ya listo para imprimir!
      </p>
    </div>
    <button class="px-32 rounded-xl py-2 bg-pink-500 text-white" @click="isMounted = true">
      Ok! <span class="animate-pulse">👍</span>
    </button>
  </div>
  <div>
    <div class="bg-black w-32 rounded-r-2xl text-6xl text-white flex justify-center mt-10">
      {{ step }}
    </div>
    <div class="flex flex-col m-20" v-show="step == 1">
      <p class="text-6xl mb-8">Escribe el nombre de tu examen 📄</p>
      <input
        type="text"
        class="h-32 text-6xl text-pink-500 rounded-xl border-2 p-4"
        v-model="examen.name"
        @keypress.enter="step++"
      />
    </div>
    <div v-show="step == 2" class="flex flex-col mx-20 my-10">
      <p class="text-6xl mb-8 text-center -mt-14">Datos de identificación📄</p>
      <p class="text-center mb-4">
        Tal y como lo escribas en los campos es como aparecera en tu examen
      </p>
      <label class="text-xl flex items-center gap-2"
        ><BuildingLibraryIcon class="w-5 stroke-gray-400" /> Escuela</label
      >
      <input
        type="text"
        class="border-2 h-10 mt-2 rounded-lg p-4 text-pink-500"
        v-model="examen.school"
        placeholder='"Esc. Sec. #1 "Benito Juarez""'
      />

      <label class="text-xl mt-12 flex items-center gap-2"
        ><UserCircleIcon class="w-5 stroke-gray-400" /> Docente</label
      >
      <input
        type="text"
        class="border-2 h-10 mt-2 rounded-lg p-4 text-pink-500"
        v-model="examen.teacher"
        placeholder="Lic. Juan Antonio P."
      />
    </div>

    <div v-if="step == 3">
      <p class="text-6xl mb-8 text-center -mt-14">Selecciona el tema ➕</p>
      <div class="flex gap-10 justify-center">
        <div v-for="(subject, index) in materias" :key="index">
          <button
            :class="{
              'bg-pink-500 text-white': examen.subject == subject,
              'flex gap-2 px-3 border-2 border-pink-600 py-1 rounded-xl mt-10': true
            }"
            @click="examen.subject = subject"
          >
            {{ subject }}
          </button>
        </div>
      </div>
      <div class="flex">
        <button class="flex gap-2 px-3 border-2 border-pink-600 py-1 rounded-xl my-10">
          {{ themes }}
        </button>
      </div>
    </div>
    <div
      :class="{
        'flex justify-end items-end': step == 1,
        'flex justify-between ': step != 1
      }"
    >
      <button
        @click="step--"
        class="w-20 self-end flex justify-center rounded-3xl bg-gradient-to-r from-pink-500 to-pink-600 mx-10"
        v-if="step != 1"
      >
        <ChevronRightIcon class="w-10 stroke-white rotate-180" />
      </button>
      <button
        @click="step++"
        class="w-20 self-end flex justify-center rounded-3xl bg-gradient-to-r from-pink-500 to-pink-600 mx-10"
      >
        <ChevronRightIcon class="w-10 stroke-white" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.gradient-text-blue {
  background-clip: text;
  color: transparent;
  background-image: linear-gradient(
    to right,
    #70a6ff,
    #4a8be8
  ); /* Personaliza los colores del gradiente */
}

.directions > p > span {
  font-weight: normal;
  margin-top: 3px;
}
.directions > p {
  font-weight: bold;
}
</style>
