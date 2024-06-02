<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue';
// const selectedKeys = ref(['1']);
const collapsed = ref(false);
// const openKeys = ref(['sub1']);
import { useAppConfigStore } from '@/stores/appConfig';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons-vue';
import navLeftMenu from '@/components/navbar/menu/navLeftMenu.vue'

const { $state } = useAppConfigStore();
// :theme=""
$state.apptheme

</script>

<template>
 <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" theme="light" :trigger="null" collapsible width="2rem">
      <div class="logo" />
      <navLeftMenu></navLeftMenu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', minHeight: '280px' }"
      >
        <RouterView></RouterView>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 64px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
