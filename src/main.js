import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
const app = createApp(App)
app.use(createPinia())



for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 引入路由配置
import router from './router'

// 引入国际化配置
import il8n from  './il8n'

app.use(router)
app.use(il8n)

app.mount('#app')
