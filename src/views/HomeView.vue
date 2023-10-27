<script setup lang="ts">
import { HomeIcon } from '@heroicons/vue/24/outline'
import { db } from '../services/firebase.js'
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore'
import { onMounted } from 'vue'

async function createColl() {
  const docRef = await addDoc(collection(db, 'users'), {
    first: 'Ada',
    last: 'Lovelace',
    born: 1815
  })
  console.log('Document written with ID: ', docRef.id)
}
</script>

<template>
  <main>
    <button @click="createColl">Create</button>
    <h1 class="text-4xl flex gap-10"><HomeIcon class="w-10 h-20" /> Home</h1>
  </main>
</template>
