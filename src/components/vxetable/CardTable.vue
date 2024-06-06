<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, defineProps, computed } from 'vue'
const gridRef = ref()

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  tableConfig: {
    type: Object,
    default: () => {}
  },
  tableColumns: {
    type: Array,
    default: () => {}
  },
  tableData: {
    type: Array,
    default: () => {}
  },
  height: {
    type: Number,
    default: 0
  }
})

console.log(props.title)

const autoHeight = computed(() => {
  console.log(document.body.offsetHeight);
  return document.body.offsetHeight;
})
</script>
<template>
  <a-card :title="props.title" :bordered="false">
    <vxe-grid
      ref="gridRef"
      :columns="props.tableColumns"
      :data="props.tableData"
      v-bind="props.tableConfig"
      :height="autoHeight"
      :auto-resize="true"
    ></vxe-grid>
  </a-card>
</template>
