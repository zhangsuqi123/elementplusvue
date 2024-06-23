<script setup>

const props = defineProps({
  title: {
    type: String,
    default: ''
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
    :style="{
      width: `${props.width}`,
      height: `${props.height}`
   
   }"
  >
    <slot></slot>
  </a-card>
</template>
