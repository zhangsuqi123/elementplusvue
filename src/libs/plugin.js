// import Vue from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { LazyVxeUITable } from '@/utils/vxetable'

// console.log(Vue);
export default {
  install(Vue) {
    LazyVxeUITable(Vue)
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      Vue.component(key, component)
    }
  }
}
