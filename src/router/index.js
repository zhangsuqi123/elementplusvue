import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { getCookie } from '@/libs/cookie';

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

router.beforeEach((to, from, next) => {
  
  // const { $state:state } = useAppConfig();
  // if(!state.isInit){
  //   console.log(state.routeData);
  //   fmtRoute(state.routeData);
  //   // router.addRoute();
  // }
  // 如果目标路由是 'Login'
  if (to.name === 'Login') {
    next();
    return;
  }

  // 获取 token
  const token = getCookie('token');

  // 如果没有 token，重定向到登录页面
  if (!token) {
    next({ name: 'Login' });
  } else {
    next(); // 继续导航
  }
});

export default router;
