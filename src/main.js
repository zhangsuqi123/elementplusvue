import './assets/base.css';
import { createApp } from 'vue';
// 引入pinia
import { createPinia } from 'pinia';
// 引入路由配置
import router from '@/router';

console.log(12345);

import App from './App.vue';
const app = createApp(App);
let loading = document.getElementById('loading');
loading.style.display = 'block';

import '@/assets/_index.scss';

// 引入配置项
import plugin from '@/libs/plugin';

// 引入国际化配置
import il8n from '@/il8n';

// 使用pinia
app.use(createPinia()).use(router).use(il8n).use(plugin);
// import '@/libs/flexible'

router.isReady().then(() => {
  console.log('路由加载完成');
  app.mount('#app');
});
