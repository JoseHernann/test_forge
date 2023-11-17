<script setup lang="ts">
import {ChevronRightIcon , BuildingLibraryIcon , UserCircleIcon, DocumentTextIcon} from "@heroicons/vue/24/outline";
import {computed, nextTick, onBeforeMount, onMounted, reactive, ref, watch} from "vue";
import {db} from "../services/firebase";
import {collection, query, where, getDocs, doc, updateDoc} from "firebase/firestore";
import VLoader from "@/components/VLoader.vue";
import GeneratedExam from "@/views/auxComponents/GeneratedExam.vue";
import {Toast} from "@/utils/alerts";

const step = ref(1)
const exam = reactive({
  name: '',
  school: '',
  teacher: '',
  subject: '',
  theme: '',
  typeOfQuestions: '',
  maxQuestions: 0
})
const materias = ref(['Español', 'Matematicas' , 'Ciencias Naturales' ])
const Types = ref(['Opción multiple', 'Abiertas'])

const themes = ref<Array<string>>([])
const isLoading = ref(false)

async function getThemes(){
  isLoading.value = true;
  themes.value = [];
  const qs = await getDocs(query(collection(db, exam.subject)));
   qs.forEach((doc) => {
     themes.value.push(doc.data().Tema)
   });

  isLoading.value = false;
}

function  AssignSubject(subject: any){
  exam.subject = subject;
  getThemes();
  exam.typeOfQuestions = ''
  exam.maxQuestions = 0
}
const MaxDBQuestions = ref(0)
async function typeOfQuestionSelected(typeOfQuestion:string){
  exam.typeOfQuestions = typeOfQuestion
  const qs = await getDocs(query(collection(db, exam.subject), where("Tema", "==", exam.theme)));
  qs.forEach((doc) => {
    if (typeOfQuestion == 'Opción multiple'){
      MaxDBQuestions.value = doc.data().PreguntasOpcionMultiple.length
    }else{
      MaxDBQuestions.value = doc.data().PreguntasAbiertas.length
    }
  });
}

function nextStep(){
  if(step.value == 1){
    if(exam.name == ''){
       Toast.fire({
        icon: 'error',
        title: 'Completa todos los campos'
      })
    }
    else {
      return step.value++
    }
  }
  else if (step.value == 2){
    if(exam.school  == '' || exam.teacher == ''){
      Toast.fire({
        icon: 'error',
        title: 'Completa todos los campos'
      })
    }
    else {
      return step.value++
    }

  }
  else {
    step.value++
  }

}
</script>

<template>
  <div>
    <div class=" bg-black w-32 rounded-r-2xl text-6xl text-white flex justify-center mt-10">
      {{step}}
    </div>

    <div class="flex flex-col m-20" v-show="step == 1">
      <p class="text-6xl mb-8" >Escribe el nombre de tu examen 📄 </p>
      <input type="text" class=" h-32 text-6xl text-pink-500 rounded-xl border-2 p-4" v-model="exam.name" placeholder="Examen 1" @keypress.enter="nextStep">
    </div>

    <div v-show="step == 2" class="flex flex-col mx-20 my-10" >
      <p class="text-6xl mb-8 text-center -mt-14">Datos de identificación📄 </p>
      <p class="text-center mb-4">Tal y como lo escribas en los campos es como aparecera en tu examen</p>
      <label class="text-xl flex items-center gap-2"><BuildingLibraryIcon class="w-5 stroke-gray-400"/> Escuela</label>
      <input type="text" class="border-2  h-10 mt-2 rounded-lg p-4 text-pink-500" v-model="exam.school" placeholder='Esc. Sec. #1 "Benito Juarez"'>
      <label class="text-xl mt-12 flex items-center gap-2"><UserCircleIcon class="w-5 stroke-gray-400"/> Docente</label>
      <input type="text" class="border-2  h-10 mt-2 rounded-lg p-4 text-pink-500" v-model="exam.teacher" placeholder="Lic. Juan Antonio P." >
    </div>

    <div v-if="step == 3">
      <p class="text-3xl mb-2 text-center -mt-14 lg:text-4xl md:text-4xl">Selecciona la materia ➕ </p>
     <div class="flex gap-5 justify-center flex-wrap">
       <div  v-for="(subject,index ) in materias" :key="index" class="flex " >
         <button
             @click="AssignSubject(subject)"
             :class="
                  {'bg-pink-500 text-white' : exam.subject == subject ,
                  'flex gap-2 px-3 border-2 border-pink-600 py-1 rounded-xl mt-10' : true }"
         >
           {{subject}}
         </button>
       </div>
     </div>

      <div class="flex justify-center my-8 flex-col items-center gap-10 transition-all" v-show="exam.subject != ''">
        <p class="text-4xl mt-5"> Temas Disponibles</p>
        <VLoader :width="10" v-if="isLoading" />
      </div>

      <div class="flex flex-wrap mb-12 mx-10 gap-10 max-h-96 overflow-y-scroll overflow-x-hidden" >
        <div v-for="(theme, index) in themes" :key="index" >
          <button
              @click="exam.theme = theme"
              :class="{
                'px-3  bg-pink-500 py-1 rounded-lg text-white ':exam.theme == theme ,
                'px-3 border border-pink-500 py-1 rounded-lg': true
              }">
            {{ theme }}
          </button>
        </div>
      </div>

      <div class="flex justify-center flex-col items-center transition-all " v-show="exam.theme != ''">
        <p class="text-4xl"> Tipo de preguntas</p>
        <div class="flex gap-10 mt-7" v-if="!isLoading">
          <button
              @click="typeOfQuestionSelected(TypOfQuestions)"
              v-for="(TypOfQuestions,index) in Types" :key="index"
              :class="{
                'bg-pink-600 rounded-lg text-white ': exam.typeOfQuestions == TypOfQuestions,
                'border-pink-500 border rounded-lg px-2':true}" >{{TypOfQuestions}}
          </button>
        </div>
        <VLoader :width="10" v-if="isLoading" />
      </div>

        <div class="flex justify-center flex-col items-center transition-all mt-12" v-show="exam.typeOfQuestions != ''">
          <p class="text-3xl"> Cantidad de preguntas</p>
          <div class="flex gap-10 mt-10" v-if="!isLoading">
            <input type="range" v-model="exam.maxQuestions" :max="MaxDBQuestions" class="bg-pink-500 border-pink-500">
            {{exam.maxQuestions}}
          </div>
          <VLoader :width="10" v-if="isLoading" />
        </div>
    </div>

    <div v-if="step == 4">
      <GeneratedExam :exam="exam" :maxQuestions="exam.maxQuestions"/>
    </div>

    <div :class="{
      'flex justify-end items-end': step == 1,
      'flex justify-between ': step != 1
      }">
      <button @click="step--" class=" w-20 self-end  flex justify-center rounded-3xl bg-gradient-to-r from-pink-500 to-pink-600 mx-10" v-if="step != 1"><ChevronRightIcon  class="w-10 stroke-white rotate-180"/></button>
      <button @click="nextStep" class=" w-20 self-end  flex justify-center rounded-3xl bg-gradient-to-r from-pink-500 to-pink-600 mx-10 " ><ChevronRightIcon  class="w-10 stroke-white "/></button>
    </div>

  </div>
</template>

<style scoped>

.directions > p > span {
  font-weight: normal;
  margin-top: 3px;
}
.directions > p {
  font-weight: bold;
}
</style>