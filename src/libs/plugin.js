// import Vue from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { LazyVxeUITable } from '@/utils/vxetable';
import { globalCookiesConfig } from 'vue3-cookies';
globalCookiesConfig({
  expireTimes: '7d',
  path: "/",
  domain: "",
  secure: true,
  sameSite: "None"
});

export default {
  install(Vue) {
    LazyVxeUITable(Vue)
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      Vue.component(key, component)
    }
  }
}
