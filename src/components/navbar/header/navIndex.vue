<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import themeToogle from '@/components/navbar/components/themeToogle.vue'
import { useAppConfigStore } from '@/stores/appConfig'
const { $state, setMenuCollapsed } = useAppConfigStore()
</script>
<template>
  <a-layout-header
    style="background: #fff; margin: 0; display: flex; justify-content: space-between"
  >
    <menu-unfold-outlined
      v-if="$state.collapsed"
      class="trigger"
      @click="setMenuCollapsed(false)"
    />
    <menu-fold-outlined v-else class="trigger" @click="setMenuCollapsed(true)" />
    <themeToogle></themeToogle>
  </a-layout-header>
</template>
