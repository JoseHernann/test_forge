<script setup lang="ts">
import  {ChatBubbleLeftRightIcon , BeakerIcon , CircleStackIcon , BookOpenIcon , ArrowUpRightIcon  } from "@heroicons/vue/24/outline";
import  { CheckCircleIcon } from "@heroicons/vue/24/solid";
import {ref} from "vue";
import router from "@/router";

const flip = ref([false, false, false, false])

function flipCard(index:number){
  flip.value[index] = !flip.value[index]
}


</script>

<template>
  <div >
    <div class="flex flex-col gap-10 mx-8 ">
      <div class="flex flex-col gap-8">
        <p class="text-4xl md:text-5xl mt-8 font-normal ">Opciones para crear exámenes ✨</p>
        <p class="text-lg font-light">Toca una de nuestras opciones para descubrir cómo funciona👇🏼 </p>
      </div>
<!--      AZUL-->
      <div class="flex gap-12 flex-wrap justify-between ">
        <div :class="{
          'bg-gradient-to-b from-blue-200 rounded-xl cursor-pointer hover:scale-[110%] hover:transition-all': flip[1] == false,
          'bg-blue-200 rounded-xl cursor-pointer transform rotate-y-180 transition-all': flip[1] == true
          }" @click="flipCard([1])">
          <div class=" w-[18rem] h-[28rem] relative flip-card">
            <div class="flip-card-inner " >
              <div class="flip-card-front  " v-show="flip[1] == false" >
                <div class="flex flex-col justify-between h-full">
                  <ChatBubbleLeftRightIcon class="stroke-[0.5] stroke-blue-500 w-60 self-center mt-10 "/>
                  <p class="text-2xl  text-blue-500 mx-5 my-5">01.<br>Asistente</p>
                </div>
              </div>
              <div class="flip-card-back" v-show="flip[1] == true">
                <div class="flex flex-col justify-between h-full ">
                  <div class="flex items-center justify-around">
                    <p class="text-xl  text-blue-500 mt-20">01.<br>Asistente</p>
                  <ChatBubbleLeftRightIcon class="stroke-[0.5] stroke-blue-500 w-24   "/>
                  </div>
                  <div class="flex flex-col w-full">
                    <p class="text-md  text-white font-bold mx-5 my-5">El asistente te guiará en la creación de tu examen, <span class="text-blue-600">paso a paso</span>.</p>
                    <ul class="text-sm ml-3 text-white ">
                      <li><CheckCircleIcon class="w-3 fill-blue-600"/> Escribe tus propias preguntas</li>
                      <li><CheckCircleIcon class="w-3 fill-blue-600"/>Elige el tipo de pregunta</li>
                      <li><CheckCircleIcon class="w-3 fill-blue-600"/>Genera tu examen</li>
                      <li><CheckCircleIcon class="w-3 fill-blue-600"/>Descarga en PDF</li>
                    </ul>
                  </div>
                  <button @click='router.push("/asistente")' class="flex  rounded-3xl items-center mx-10 justify-center gap-4 mt-9 p-3 bg-blue-500 text-white hover:bg-white hover:text-blue-600 start-as-btn">Comenzar <ArrowUpRightIcon class="w-7 rounded-xl stroke-white stroke-2 h-7 border-white border p-0.5"/></button>
                </div>
              </div>
            </div>
          </div>
        </div>
<!--        ROSA-->
        <div :class="{
          'bg-gradient-to-b from-pink-200 rounded-xl cursor-pointer hover:scale-[110%] hover:transition-all': flip[2] == false,
          'bg-pink-200 rounded-xl cursor-pointer transform rotate-y-180 transition-all': flip[2] == true
          }" @click="flipCard([2])">
          <div class=" w-[18rem] h-[28rem] relative flip-card ">
            <div class="flip-card-inner " >
              <div class="flip-card-front  " v-show="flip[2] == false" >
                <div class="flex flex-col justify-between h-full">
                  <CircleStackIcon class="stroke-[0.5] stroke-pink-500 w-60 self-center mt-10"/>
                  <p class="text-2xl  text-pink-500 mx-5 my-5">02.<br>Base de datos</p>
                </div>
              </div>
              <div class="flip-card-back" v-show="flip[2] == true">
                <div class="flex flex-col justify-between h-full ">
                  <div class="flex items-center justify-around">
                    <p class="text-xl  text-pink-500 mt-20">02.<br>Base de datos</p>
                    <CircleStackIcon class="stroke-[0.5] stroke-pink-500 w-24   "/>
                  </div>
                  <div class="flex flex-col w-full">
                    <p class="text-md  text-white font-bold mx-5 my-5">Utiliza nuestra base de datos con mas de <span class="text-pink-500">1,000 preguntas</span> de diferentes temas</p>
                    <ul class="text-sm ml-3 text-white ">
                      <li><CheckCircleIcon class="w-3 fill-pink-600"/>Selecciona un tema</li>
                      <li><CheckCircleIcon class="w-3 fill-pink-600"/>Selecciona el tipo de preguntas</li>
                      <li><CheckCircleIcon class="w-3 fill-pink-600"/>Genera tu examen</li>
                      <li><CheckCircleIcon class="w-3 fill-pink-600"/>Descarga en PDF</li>
                    </ul>
                  </div>
                  <button @click='router.push("/base-de-datos")' class="flex  rounded-3xl items-center mx-10 justify-center gap-4 mt-9 p-3 bg-pink-500 text-white hover:bg-white hover:text-pink-600 start hover:stroke-pink-500 start-bd-btn">Comenzar <ArrowUpRightIcon class="w-7 rounded-xl stroke-white stroke-2 h-7 border-white border p-0.5 "/></button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- MORADO-->
        <div :class="{
          'bg-gradient-to-b from-purple-200 rounded-xl cursor-pointer hover:scale-[110%] hover:transition-all': flip[3] == false,
          'bg-purple-200 rounded-xl cursor-pointer transform rotate-y-180 transition-all': flip[3] == true
          }" @click="flipCard([3])">
          <div class=" w-[18rem] h-[28rem] relative flip-card ">
            <div class="flip-card-inner " >
              <div class="flip-card-front  " v-show="flip[3] == false" >
                <div class="flex flex-col justify-between h-full">
                  <BeakerIcon class="stroke-[0.5] stroke-purple-500 w-60 self-center mt-10"/>
                  <p class="text-2xl  text-purple-500 mx-5 my-5">03.<br>Inteligencia artificial</p>
                </div>
              </div>
              <div class="flip-card-back" v-show="flip[3] == true">
                <div class="flex flex-col justify-between h-full ">
                  <div class="flex items-center justify-around">
                    <p class="text-lg  text-purple-500 mt-20">03.<br>Inteligencia artificial</p>
                    <BeakerIcon class="stroke-[0.5] stroke-purple-500 w-20 "/>
                  </div>
                  <div class="flex flex-col w-full">
                    <p class="text-md  text-white font-bold mx-5 my-5">Escribe el tema que deseas y la <span class="text-purple-400">IA</span> crea un examen por ti</p>
                    <ul class="text-sm ml-3 text-white ">
                      <li><CheckCircleIcon class="w-3 fill-purple-600"/>Selecciona un tema</li>
                      <li><CheckCircleIcon class="w-3 fill-purple-600"/>Selecciona el tipo de preguntas</li>
                      <li><CheckCircleIcon class="w-3 fill-purple-600"/>Genera tu examen</li>
                      <li><CheckCircleIcon class="w-3 fill-purple-600"/>Descarga en PDF</li>
                    </ul>
                  </div>
                  <button
                      @click='router.push("/base-de-datos")'
                      class="flex  rounded-3xl items-center mx-10 justify-center gap-4 mt-9 p-3 bg-purple-500 text-white hover:bg-white hover:text-purple-600 start hover:stroke-pink-500 start-ia-btn ">
                      Comenzar
                    <ArrowUpRightIcon class="w-7 rounded-xl stroke-white stroke-2 h-7 border-white border p-0.5 "/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-b from-gray-400 rounded-xl w-[18rem] h-[28rem]  flex flex-col justify-between">
          <BookOpenIcon class="stroke-[0.5] stroke-gray-500 w-60 self-center mt-10"/>
          <p class="text-2xl  text-gray-500 mx-5 my-5">04.<br>Plantillas</p>
          <p class="bg-red-500 sticky bottom-40 right-28 p-2 rounded-lg text-white w-fit ml-20">PROXIMAMENTE</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
li{
  display:flex;
  gap: 10px;
}

.start-bd-btn:hover > svg{
  stroke: #F472B6;
  border-color: #F472B6;
}

.start-ia-btn:hover > svg{
  stroke: #a855fa;
  border-color: #a855fa;
}

.start-as-btn:hover > svg{
  stroke: #3b82f6;
  border-color: #3b82f6;
}
</style>
