import { createRouter, createWebHistory } from 'vue-router'
import { h } from 'vue'
import { SettingOutlined } from '@ant-design/icons-vue'
import HomeView from '../views/HomeView.vue'
import { getCookie } from '@/libs/cookie'

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
          component: () => import('@/views/app/settings/MenuInfo.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 如果目标路由是 'Login'
  if (to.name === 'Login') {
    next();
    return;
  }

  // 获取 token
  const token = getCookie("token");

  // 如果没有 token，重定向到登录页面
  if (!token) {
    next({ name: 'Login' });
  } else {
    next(); // 继续导航
  }
})

export default router
