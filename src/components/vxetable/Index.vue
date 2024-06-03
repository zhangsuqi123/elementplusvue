<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, reactive } from 'vue'
const gridRef = ref()
const footerData = ref([])
const gridOptions = reactive({
  border: true,
  showOverflow: true,
  showHeaderOverflow: true,
  showFooterOverflow: true,
  showFooter: true,
  height: 500,
  loading: false,
  scrollX: {
    enabled: true
  },
  scrollY: {
    enabled: true
  },
  rowConfig: {
    keyField: 'id'
  },
  checkboxConfig: {
    labelField: 'id'
  },
  footerMethod () {
    return footerData.value
  }
})
</script>
<template>
  <vxe-grid ref="gridRef" v-bind="gridOptions"></vxe-grid>
</template>
