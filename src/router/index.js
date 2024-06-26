import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { getCookie } from '@/libs/cookie';
import { useAppConfig } from '@/stores/appConfig';
const modules = import.meta.glob('@/views/**/*.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/app/Login.vue'),
      meta: {
        isFullScreen: true
      }
    }
  ]
});

// console.dir(useAppConfig().$subscribe);

router.beforeEach(async (to, from, next) => {
  // 如果目标路由是 'Login'
  if (to.name === 'Login') {
    next();
    let loading = document.getElementById('loading');
    if (loading){
      loading.style.display = 'none';
    }
    return;
  }
  // 获取 token
  const token = getCookie('token');
  // 如果没有 token，重定向到登录页面
  if (!token) {
    next({ name: 'Login' });
    return;
  }
  const { $state: state, getBasicInfo } = useAppConfig();
  if (!state.isInit) {
    const [menuData, routeData] = await getBasicInfo();
    for (const item of routeData) {
      console.log(item);
      const componentPath = `/src/views/${item.component}.vue`;
      if (modules[componentPath]) {
        const component = await modules[componentPath]();
        router.addRoute({
          path: `/${item.url}`,
          name: item.id,
          component: component.default,
          meta: {}
        });
      }
    }
    next({...to, replace: true});
    return;
  }


  next(); // 继续导航
});

export default router;
