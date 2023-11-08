<script setup lang="ts">
import {
  ChevronRightIcon,
  BuildingLibraryIcon,
  UserCircleIcon,
  DocumentTextIcon
} from '@heroicons/vue/24/outline'
import { onBeforeMount, onMounted, ref } from 'vue'
import jsPDF from 'jspdf'

const step = ref(1)
const showQuestionsBlock = ref(false)
const isMounted = ref(false)
const examen = ref({
  name: '',
  school: '',
  teacher: '',
  subject: '',
  selectedQuestionType: 'abierta',
  questions: [
    {
      type: '',
      question: '',
      options: [
        {
          option: '',
          isCorrect: false
        }
      ]
    }
  ]
})

//Agregar preguntas
const addQuestion = () => {
  examen.value.questions.push({
    type: examen.value.selectedQuestionType,
    question: '',
    options:
      examen.value.selectedQuestionType === 'abierta'
        ? []
        : [
            {
              option: '',
              isCorrect: false
            }
          ]
  })
  showQuestionsBlock.value = true
}

const getInciso = (index: number) => {
  const letras = 'abcdefghijklmnopqrstuvwxyz' // Puedes agregar más letras según tus necesidades
  if (index < letras.length) {
    return letras[index] + ')' // Devuelve letras minúsculas como incisos (a), (b), (c), ...
  } else {
    return index - letras.length + 1 + ')' // Utiliza números para más opciones (1), (2), (3), ...
  }
}

const downloadPDF = () => {
  const doc = new jsPDF()

  doc.setFontSize(16)
  doc.text(examen.value.name, 10, 10)

  let y = 30
  doc.setFontSize(12)

  doc.text(`Escuela: ${examen.value.school}`, 10, y)
  y += 10
  doc.text(`Docente: ${examen.value.teacher}`, 10, y)
  y += 10
  doc.text(`Materia: ${examen.value.subject}`, 10, y)

  y += 20
  doc.setFontSize(12)
  doc.text('Instrucciones', 10, y)

  const instructions = [
    `1. Este examen consta de ${examen.value.questions.length} preguntas.`,
    '2. No se permite el uso de dispositivos electrónicos.',
    '3. Tiempo máximo: 60 minutos.'
  ]

  y += 10
  doc.setFontSize(10)
  instructions.forEach((instruction) => {
    y += 10
    doc.text(instruction, 15, y)
  })

  // Agrega las preguntas y opciones al PDF
  examen.value.questions.forEach((question, index) => {
    y += 20
    doc.setFontSize(12)
    doc.text(`Pregunta ${index + 1}: ${question.question}`, 10, y)

    if (question.options.length > 0) {
      y += 10
      doc.setFontSize(10)
      question.options.forEach((option, optionIndex) => {
        y += 10
        doc.text(`- ${option.option}`, 15, y)
      })
    }
  })

  // Agrega el espacio para calificación y firmas
  y += 20
  doc.setFontSize(10)
  doc.text('Calificación: ________ / 10', 10, y)
  y += 10
  doc.text('Firma del Estudiante: __________________________', 10, y)
  y += 10
  doc.text('Firma del Profesor: ___________________________', 10, y)

  // Guarda y descarga el PDF
  doc.save('ExamenTestForge.pdf')
}

//Opciones preguntas cerradas
const addOption = (question: { options: Array<{ option: string; isCorrect: boolean }> }) => {
  question.options.push({
    option: '',
    isCorrect: false
  })
}

//Eliminar Opcion de respuesta
const removeOption = (
  question: {
    options: Array<{ option: string; isCorrect: boolean }>
  },
  optionIndex: number
) => {
  question.options.splice(optionIndex, 1)
}

//Eliminar preguntas agregadas
const removeQuestion = (index: number) => {
  examen.value.questions.splice(index, 1)
}

//Descargar en PDF el examen
</script>

<template>
  <div
    class="flex flex-col gap-10 z-10 justify-center items-center absolute w-screen h-screen bg-black/80"
    v-if="isMounted == false"
  >
    <div class="flex flex-col items-center">
      <h1 class="text-4xl text-center w-fit px-10 py-4 rounded-t-3xl text-white bg-blue-500">
        Asistente
      </h1>
      <div class="bg-blue-500 rounded-xl p-2 z-[1]">
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
        3. Agregar tus preguntas ➕<span class="ml-10 flex flex-col">
          💭 Agrega cuantas preguntas quieras *No te preocupes tu examen solo tendra la cantidad que
          desees* <br />
          💭Elige el tipo de pregunta que quieres
        </span>
      </p>
      <p class="flex flex-col">4. Visualiza tu examen 👁️</p>
      <p class="flex flex-col">
        5. Si todo esta correcto ✅ ¡Descargalo en PDF ya listo para imprimir!
      </p>
    </div>
    <button class="px-32 rounded-xl py-2 bg-blue-500 text-white" @click="isMounted = true">
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
        class="h-32 text-6xl text-blue-500 rounded-xl border-2 p-4"
        v-model="examen.name"
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
        class="border-2 h-10 mt-2 rounded-lg p-4 text-blue-500"
        v-model="examen.school"
        placeholder='"Esc. Sec. #1 "Benito Juarez""'
      />

      <label class="text-xl mt-12 flex items-center gap-2"
        ><UserCircleIcon class="w-5 stroke-gray-400" /> Docente</label
      >
      <input
        type="text"
        class="border-2 h-10 mt-2 rounded-lg p-4 text-blue-500"
        v-model="examen.teacher"
        placeholder="Lic. Juan Antonio P."
      />

      <label class="text-xl mt-12 flex items-center gap-2"
        ><DocumentTextIcon class="w-5 stroke-gray-400" /> Materia</label
      >
      <input
        type="text"
        class="border-2 h-10 mt-2 rounded-lg p-4 text-blue-500"
        v-model="examen.subject"
        placeholder="Matematicas"
      />
    </div>

    <div v-show="step == 3" class="flex flex-col mx-20 my-10">
      <p class="text-6xl mb-8 text-center -mt-14">Agrega tus preguntas ➕</p>
      <div class="flex flex-col justify-center items-center space-y-4">
        <button class="bg-pink-500 text-white px-3 py-2 rounded-md" @click="addQuestion">
          Agregar Pregunta
        </button>
        <div class="flex items-center space-x-2">
          <p class="text-blue-500">Selecciona el tipo de pregunta:</p>
          <select
            v-model="examen.selectedQuestionType"
            class="text-blue-500 border border-blue-500 rounded p-2"
          >
            <option value="abierta">Abierta</option>
            <option value="cerrada">Cerrada</option>
          </select>
        </div>
      </div>

      <div v-if="showQuestionsBlock">
        <div v-for="(question, index) in examen.questions" :key="index">
          <div class="flex justify-between items-center">
            <p class="text-2xl">Pregunta {{ index + 1 }}:</p>
            <button class="text-red-500" @click="removeQuestion(index)">Eliminar</button>
          </div>
          <input
            type="text"
            class="h-32 text-6xl text-blue-500 rounded-xl border-2 p-4"
            v-model="question.question"
          />
          <div v-if="examen.selectedQuestionType === 'cerrada'">
            <div class="mt-4">
              <p>Opciones:</p>
              <div v-for="(option, optionIndex) in question.options" :key="optionIndex">
                <input
                  type="text"
                  class="h-12 text-4xl text-blue-500 rounded-lg border-2 p-2"
                  v-model="option.option"
                />
                <button class="text-red-500" @click="removeOption(question, optionIndex)">
                  Eliminar Opción
                </button>
              </div>
              <button
                class="bg-pink-500 text-white px-3 py-2 rounded-md"
                @click="addOption(question)"
              >
                Agregar Opción
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-show="step == 4" class="flex flex-col mx-20 my-10">
      <p class="text-6xl mb-8 text-center -mt-14">Visualiza tu examen 👁️</p>
      <div class="text-center mb-4">
        <h1 class="text-4xl font-bold">Examen Tipo A1</h1>
      </div>

      <div class="border p-4 mb-8">
        <h2 class="text-2xl font-bold mb-2">{{ examen.name }}</h2>
        <p class="text-1xl">Escuela: {{ examen.school }}</p>
        <p class="text-1xl">Docente: {{ examen.teacher }}</p>
        <p class="text-1xl">Materia: {{ examen.subject }}</p>
        <p class="text-1xl">Fecha:_________</p>
      </div>

      <div class="border p-4 mb-4">
        <h2 class="text-2xl font-bold mb-2">Instrucciones</h2>
        <p class="text-1xl">1. Este examen consta de {{ examen.questions.length }} preguntas.</p>
        <p class="text-1xl">2. No se permite el uso de dispositivos electrónicos.</p>
        <p class="text-1xl mb-4">3. Tiempo máximo: 60 minutos.</p>

        <div v-for="(question, index) in examen.questions" :key="index">
          <h3 class="text-2xl font-bold">Pregunta {{ index + 1 }}</h3>
          <p class="text-1x1">{{ question.question }}</p>
          <div
            v-for="(option, optionIndex) in question.options"
            :key="optionIndex"
            class="text-1xl"
          >
            {{ getInciso(optionIndex) }} {{ option.option }}{{ option.option }}
          </div>
        </div>

        <p class="text-1xl mb-4">Calificación: ________ / 10</p>
        <p class="text-1xl mb-4">Firma del Estudiante: __________________________</p>
        <p class="text-1xl mb-4">Firma del Profesor: ___________________________</p>
      </div>
    </div>

    <div v-show="step == 5" class="flex flex-col mx-20 my-10">
      <p class="text-6xl mb-8 text-center -mt-14">Descargar el examen en PDF 📥</p>
      <p class="text-center mb-4">
        Si todo esta en orden ¡Descargalo en PDF ya listo para imprimir!
      </p>
      <div class="text-center mb-4">
        <button class="bg-blue-500 text-white p-2 px-4 rounded-md" @click="downloadPDF">
          Descargar PDF
        </button>
      </div>
    </div>

    <div
      :class="{
        'flex justify-end': step == 1,
        'flex justify-between': step != 1
      }"
    >
      <button
        @click="step--"
        class="w-20 self-end flex justify-center rounded-3xl bg-gradient-to-r from-blue-500 to-blue-600 mx-10"
        v-if="step != 1"
      >
        <ChevronRightIcon class="w-10 stroke-white rotate-180" />
      </button>
      <button
        @click="step++"
        class="w-20 self-end flex justify-center rounded-3xl bg-gradient-to-r from-blue-500 to-blue-600 mx-10"
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
