// import Vue from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// console.log(Vue);
export default {
  install(Vue) {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      Vue.component(key, component)
    }
  }
}
