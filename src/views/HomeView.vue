<script setup>
import { useCounterStore } from '@/stores/counter';

import { useAppConfigStore } from '@/stores/appConfig';

import themeToogle from '@/components/navbar/components/themeToogle.vue'
const { setLocale } = useAppConfigStore()
const { increment, $state } = useCounterStore();
import { Button } from 'ant-design-vue';


</script>

<template>
  当前count为{{ $state.count }}
  {{ $t('hello') }}
  <button @click="increment">点击的时候count+1</button>
  <button @click="setLocale('zh')">切换中文</button>
  <button @click="setLocale('en')">切换英文</button>
  <themeToogle></themeToogle>
  <div class="testcard"></div>
  <Button>112233</Button>
</template>
