<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import NavLeftMenu from '@/components/navbar/menu/navLeftMenu.vue';
import Header from '@/components/navbar/header/navIndex.vue';

// 获取当前路由
const route = useRoute();
const router = useRouter();

// 定义 isFullScreen 并设置初始值
const isFullScreen = ref(route.meta.isFullScreen);

// 监听路由变化，并动态更新 isFullScreen
watch(() => route.meta.isFullScreen, (newVal) => {
  isFullScreen.value = newVal;
});

// 使用路由导航守卫提前处理 isFullScreen 状态
router.beforeEach(async (to, from, next) => {
  isFullScreen.value = to.meta.isFullScreen;
  next();
});
</script>

<template>
  <RouterView v-if="isFullScreen"></RouterView>
  <a-layout v-else>
    <NavLeftMenu />
    <a-layout>
      <Header />
      <a-breadcrumb style="margin: 16px 30px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb>
      <a-layout-content :style="{ margin: '6px 20px 0px', padding: '10px 10px 0px' }">
        <RouterView />
      </a-layout-content>
      <!-- <a-layout-footer :style="{ textAlign: 'left', padding: '16px 30px' }">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer> -->
    </a-layout>
  </a-layout>
</template>

<style>
.trigger {
  font-size: 0.18rem;
  line-height: 0.6rem;
  padding: 0 0.16rem;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 0.6rem;
  background: #ff00004d;
  margin: 0.16rem;
  min-height: 0.6rem;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
