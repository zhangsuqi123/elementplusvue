<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import themeToogle from '@/components/navbar/components/themeToogle.vue'
</script>
<template>
  <a-layout-header style="background: #fff; margin: 10">
    <menu-unfold-outlined
      v-if="collapsed"
      class="trigger"
      @click="() => (collapsed = !collapsed)"
    />
    <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
    <themeToogle></themeToogle>
  </a-layout-header>
</template>