<script setup>
import { computed } from 'vue';
import { useCounterStore } from '@/stores/counter';
import { useI18n } from 'vue-i18n'
const addNum = () => {
  return useCounterStore().increment()
}
console.log(import.meta.env)

// const num = ref(useCounterStore().$state.count)

const num = computed(() => {
  return useCounterStore().$state.count
})

const { t, locale } = useI18n()
const setLocale = (newLocale) => {
  locale.value = newLocale
}
</script>

<template>
  <main>
    当前count为{{ num }}
    {{ t('hello') }}
    <button @click="addNum">点击的时候count+1</button>
    <button @click="setLocale('zh')">切换中文</button>
    <button @click="setLocale('en')">切换英文</button>
  </main>
</template>
