<script setup>
import { h, ref, watch, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { useAppConfig } from '@/stores/appConfig';
import * as icons from '@ant-design/icons-vue';
import _ from 'lodash';

const { $state: state } = useAppConfig();
const router = useRouter();
const selectedKeys = ref([]);
const openKeys = ref([]);
const MenuData = ref([
  {
    key: 'Home',
    label: '首页',
    title: '首页',
    icon: () => h(icons.HomeOutlined),
    path: '/'
  }
]);

// 格式化菜单数据
const fmtMenu = (menuData) => {
  return _.cloneDeep(menuData).map((item) => {
    return {
      key: item.id,
      label: item.menuname,
      title: item.menuname,
      icon: item.icon ? () => h(icons[item.icon]) : null,
      path: `/${item.url}`,
      children: item.children ? fmtMenu(item.children) : null
    };
  });
};

// 监听 store 中 menuData 的变化
watch(
  () => state.menuData,
  (newMenuData) => {
    const rawMenuData = toRaw(newMenuData);
    const formattedMenuData = fmtMenu(rawMenuData);
    if (JSON.stringify(MenuData.value) !== JSON.stringify(formattedMenuData)) {
      MenuData.value = [...MenuData.value,...formattedMenuData];
    }
  }
);

// 路由跳转
const toPage = ({ item }) => {
  router.push(item.path);
};
</script>

<template>
  <a-layout-sider
    v-model:collapsed="state.collapsed"
    theme="light"
    :trigger="null"
    collapsible
    width="200"
  >
    <div class="logo" />
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      :inline-collapsed="state.collapsed"
      class="menu-test"
      mode="inline"
      :items="MenuData"
      @click="toPage"
    />
  </a-layout-sider>
</template>
