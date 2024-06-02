<script setup>
import { h, ref } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();
import {
  SettingOutlined,
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined
} from '@ant-design/icons-vue';
const selectedKeys = ref([]);
const collapsed = ref(false);
const openKeys = ref([]);
const items = ref([
  {
    key: '1',
    icon: () => h(MailOutlined),
    label: 'Navigation One',
    title: 'Navigation One',
  },
  {
    key: '2',
    icon: () => h(CalendarOutlined),
    label: 'Navigation Two',
    title: 'Navigation Two',
  },
  {
    key: 'sub1',
    icon: () => h(AppstoreOutlined),
    label: 'Navigation Three',
    title: 'Navigation Three',
    children: [
      {
        key: '3',
        label: 'Option 3',
        title: 'Option 3',
      },
      {
        key: '4',
        label: 'Option 4',
        title: 'Option 4',
      },
      {
        key: 'sub1-2',
        label: 'Submenu',
        title: 'Submenu',
        children: [
          {
            key: '5',
            label: 'Option 5',
            title: 'Option 5',
          },
          {
            key: '6',
            label: 'Option 6',
            title: 'Option 6',
            children: [
              {
                key: '55',
                label: 'Option 5',
                title: 'Option 5',
              },
            ]
          },
        ],
      },
    ],
  },
  {
    key: 'Settings',
    icon: () => h(SettingOutlined),
    label: '系统设置',
    title: '系统设置',
    children: [
      {
        key: 'MenuInfo',
        label: '菜单信息',
        title: '菜单信息',
        path: '/settings/menu-info',
        // component: '@/views/settings/MenuInfo.vue'
      },
      {
        key: '8',
        label: 'Option 8',
        title: 'Option 8',
      },
      {
        key: '9',
        label: 'Option 9',
        title: 'Option 9',
      },
      {
        key: '10',
        label: 'Option 10',
        title: 'Option 10',
      },
    ],
  },
]);
const toPage = ({ item, key, keyPath }) => {
  console.log(item, key, keyPath)
  selectedKeys.value = keyPath
  router.push(item.path)
}
</script>
<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    :inline-collapsed="collapsed"
    mode="inline"
    :items="items"
    @click="toPage"
  />
</template>