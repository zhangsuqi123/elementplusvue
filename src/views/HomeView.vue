<script setup>
import { computed } from 'vue';
import { useCounterStore } from '@/stores/counter';
const addNum = () => {
  return useCounterStore().increment()
}
console.log(import.meta.env)

// const num = ref(useCounterStore().$state.count)

const num = computed(() => {
  return useCounterStore().$state.count
})
</script>

<template>
  <main>
    当前count为{{ num }}
    <button @click="addNum">点击的时候count+1</button>
  </main>
</template>
