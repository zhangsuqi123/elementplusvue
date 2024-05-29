import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
// 引入路由配置
import router from './router'

// 引入国际化配置
import il8n from  './il8n/il8n'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(il8n)

app.mount('#app')
