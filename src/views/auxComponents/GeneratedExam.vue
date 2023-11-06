<script setup lang="ts">
import {defineProps, onMounted, ref} from 'vue'
import {collection, doc, getDocs, query, where} from "firebase/firestore";
import {db}  from "@/services/firebase";
import html2pdf from "html2pdf.js";
import {Toast} from "@/utils/alerts";
import  { DocumentArrowDownIcon } from "@heroicons/vue/24/outline";
import VLoader from "@/components/VLoader.vue";


const props = defineProps({
  exam: {
    name: String,
    school: String,
    teacher: String,
    subject: String,
    theme: String,
    typeOfQuestions: String
  },
  maxQuestions: String as Number
})
const html2Pdf = ref(null)
const isLoading = ref(false)
const questions = ref([]);
const options = ref([]);

onMounted(() => {
  getQuestions()
})

async function getQuestions() {
  isLoading.value = true;
  try {
    const qs = await getDocs(query(collection(db, props.exam.subject), where("Tema", "==", props.exam.theme)));
    qs.forEach((doc) => {
      if (props.exam.typeOfQuestions === 'Opción multiple') {
        const aux = doc.data().PreguntasOpcionMultiple.splice(0, props.maxQuestions);
        aux.forEach((question) => {
          questions.value.push(question.Pregunta);
          options.value.push(question.Opciones);
        });
      } else {
        const openQuestions = doc.data().PreguntasAbiertas.splice(0, props.maxQuestions);
        questions.value = questions.value.concat(openQuestions);
      }
    });
  }
  catch (e) {
    return Toast.fire({
      icon: 'error',
      title: 'Error al obtener preguntas'
    })
  }
  isLoading.value = false;
}



function downloadPDF() {
  // Obtiene el contenido del div `#exam`
  const content = document.getElementById('exam');
  const source = content.innerHTML;

  const opt = {
    margin:       10,
    image:        { type: 'jpg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF:        { unit: 'pt', format: 'a4', orientation: 'portrait' },

  };
  try {
    html2pdf().set(opt).from(source).save('examen.pdf');
    Toast.fire({
      icon: 'success',
      title: 'PDF Generado'
    })
  }
  catch (e){
    Toast.fire({
      icon: 'error',
      title: 'Error al descargar PDF'
    })
  }
}


</script>

<template>
      <div class="flex justify-center">
        <button @click="downloadPDF" class="hover:bg-pink-500 border-pink-500 border-2 rounded-xl p-2 text-pink-500 hover:text-white font-semibold " >
          <span class="flex items-center gap-3 ">DESCARGAR PDF <DocumentArrowDownIcon class="w-7"/></span>
        </button>
      </div>
      <div class=" flex flex-col border-black border-2 m-12 pb-20 pt-10 " id="exam" >
        <div class="flex flex-col items-center" >
        <p class="text-xl font-semibold">{{ props.exam.school }}</p>
        <p class="text-xl font-semibold">{{ 'Examen de ' + props.exam.subject }}</p>
        <p class="text-xl font-bold">{{ props.exam.theme }}</p>
        </div>
        <div class="mx-20 mt-10 flex-col flex gap-3 ">
          <div  class="flex justify-center  gap-2">
            <p class="self-end justify-self-end font-semibold">Nombre: </p>
            <hr class="w-full  self-end h-0.5 bg-black border-0 ">
            <p class="w-32 font-semibold"># Lista: </p>
            <hr class="w-16 self-end h-0.5 bg-black border-0 ">
            <p class="w-10 font-semibold mr-3">Grupo: </p>
            <hr class="w-24 self-end h-0.5 bg-black border-0 ">
          </div>
          <div class="flex gap-2 justify-between">
            <div class="flex gap-2">
              <p class="font-semibold">Docente:</p>
              <p class="border-b-black border-b-2">{{props.exam.teacher }}</p>
            </div>
            <div class="flex">
              <p class="w-fit font-semibold">Fecha: </p>
              <hr class="w-36 self-end h-0.5 bg-black border-0 ">
            </div>
            <div class="flex">
              <p class="w-fit font-semibold">Calificación: </p>
              <hr class="max-w-full w-20  self-end h-0.5 bg-black border-0 ">
            </div>
          </div>
          <div class="flex flex-col mt-10">
            <p v-if="props.exam.typeOfQuestions == 'Opción multiple'"><span class="font-semibold">Instrucciones:</span> Encierra el inciso correcto en las siguientes preguntas</p>
            <p v-if="props.exam.typeOfQuestions == 'Abiertas'"><span class="font-semibold">Instrucciones:</span> Escribe la respuesta correcta</p>
          </div>
            <div class="flex flex-col gap-20" v-if="!isLoading" >
              <div v-for="(question, index) in questions" :key="index" >
                <div class="flex gap-3 mb-3" >
                  <span>{{index + 1 +'.-'}}</span>
                  <span>{{question}}</span>
                </div>
                <div class="grid grid-cols-2 gap-2 mb-3">
                  <div  v-for="(option , optionIndex) in options[index]" :key="optionIndex">
                    <span v-if="optionIndex == 0">a) {{option}}</span>
                    <span v-if="optionIndex == 1">b) {{option}}</span>
                    <span v-if="optionIndex == 2">c) {{option}}</span>
                    <span v-if="optionIndex == 3">d) {{option}}</span>
                  </div>
                </div>
              </div>
            </div>
          <div class="flex place-content-center" v-if="isLoading">
            <VLoader :width="26"/>
          </div>
        </div>
      </div>
</template>

<style scoped>

</style>