<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router'
import { ref, watchEffect } from 'vue'
import navLeftMenu from '@/components/navbar/menu/navLeftMenu.vue'
import Header from '@/components/navbar/header/Index.vue'

const collapsed = ref(false)

// 获取当前路由
const route = useRoute()
const router = useRouter()

// 定义 isFullScreen 并设置初始值
const isFullScreen = ref(route.meta.isFullScreen)

// 监听路由变化，并动态更新 isFullScreen
watchEffect(() => {
  isFullScreen.value = route.meta.isFullScreen
})

// 使用路由导航守卫提前处理 isFullScreen 状态
router.beforeEach((to, from, next) => {
  isFullScreen.value = to.meta.isFullScreen
  next()
})
</script>

<template>
  <RouterView v-if="isFullScreen"></RouterView>
  <a-layout v-else>
    <a-layout-sider
      v-model:collapsed="collapsed"
      theme="light"
      :trigger="null"
      collapsible
      width="2rem"
      height="9rem"
    >
      <div class="logo" />
      <navLeftMenu></navLeftMenu>
    </a-layout-sider>
    <a-layout>
      <Header></Header>
      <a-breadcrumb style="margin: 16px 30px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb>
      <a-layout-content
        :style="{ margin: '6px 20px 0px', padding: '10px 10px 0px', minHeight: '280px' }"
      >
        <RouterView></RouterView>
      </a-layout-content>
      <!-- <a-layout-footer :style="{ textAlign: 'left', padding: '16px 30px' }">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer> -->
    </a-layout>
  </a-layout>
</template>

<style>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 16px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 64px;
  background: rgba(255, 0, 0, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
