<script setup>
import { RouterView, useRoute } from 'vue-router'
import { ref } from 'vue';
// const selectedKeys = ref(['1']);
const collapsed = ref(false);
// const openKeys = ref(['sub1']);
// import { useAppConfigStore } from '@/stores/appConfig';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons-vue';
import navLeftMenu from '@/components/navbar/menu/navLeftMenu.vue'
import themeToogle from '@/components/navbar/components/themeToogle.vue'
const { meta } = useRoute()
const {isFullScreen} = ref(meta)



</script>

<template>
  {{ isFullScreen }}
  <RouterView v-if="isFullScreen"></RouterView>
  <a-layout v-else>
    <a-layout-sider v-model:collapsed="collapsed" theme="light" :trigger="null" collapsible width="2rem" height="9rem">
      <div class="logo" />
      <navLeftMenu></navLeftMenu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; margin: 10">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        <themeToogle></themeToogle>
      </a-layout-header>
      <a-breadcrumb style="margin: 16px 16px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb>
      <a-layout-content
        :style="{ margin: '16px 16px 0px', padding: '24px', minHeight: '280px' }"
      >
        <RouterView></RouterView>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'left', padding: '16px 16px' }">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
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
