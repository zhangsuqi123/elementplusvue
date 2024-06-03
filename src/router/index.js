import { createRouter, createWebHistory } from 'vue-router'
import { h } from 'vue'
import { SettingOutlined } from '@ant-design/icons-vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/app/Login.vue'),
      meta: {
        isFullScreen: true
      }
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
          component: () => import('@/views/settings/MenuInfo.vue')
        }
      ]
    }
  ]
})

export default router
