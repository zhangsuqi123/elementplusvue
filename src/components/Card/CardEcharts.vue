<script setup>
import { ref } from 'vue';
import echarts from '../echarts/index.vue';
const chart = ref(null);

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  options: {
    type: Object,
    default: () => ({})
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '100%'
  }
});
</script>
<template>
  <a-card
    :bordered="false"
    :title="props.title"
  >
    <echarts
      ref="chart"
      :options="props.options"
      :style="{
        width: `${props.width}`,
        height: `${props.height}`
      }"
    ></echarts>
  </a-card>
</template>
