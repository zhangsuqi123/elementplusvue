<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAppConfig } from '@/stores/appConfig';

const { $state: state, formattedMenu } = useAppConfig();
const router = useRouter();
const selectedKeys = ref(['OYpupRoP']);
const openKeys = ref(['Mwchn24O']);

// 路由跳转
const toPage = ({ item }) => {
  if (item.path) {
    router.push(item.path);
  }
};

console.log(2);

// 计算属性
const menuItems = computed(() => {
  return state.menuData;
});
const isCollapsed = computed(() => state.collapsed);
console.log(router.currentRoute);

// // 监听路由变化并设置选中的菜单项
// watch(
//   () => router.currentRoute.value.path,
//   (newPath) => {
//     selectedKeys.value = [newPath];
//   },
//   { immediate: true }
// );

// // 监听 collapsed 状态变化并保存到本地存储
// watch(
//   isCollapsed,
//   (newValue) => {
//     localStorage.setItem('menu-collapsed', newValue);
//   },
//   { immediate: true }
// );
</script>

<template>
  <a-layout-sider
    :collapsed="isCollapsed"
    theme="light"
    :trigger="null"
    collapsible
    width="200"
    @collapse="(collapsed) => state.collapsed = collapsed"
  >
    <div class="logo" />
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      :inline-collapsed="isCollapsed"
      class="menu-test"
      mode="inline"
      :items="menuItems"
      @click="toPage"
      @openChange="(keys) => openKeys = keys"
    />
  </a-layout-sider>
</template>

<style scoped>
.logo {
  height: 44px;
  background: #ff00004d;
  margin: 16px;
}
</style>
