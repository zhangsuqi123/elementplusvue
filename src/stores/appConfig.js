import { ref } from 'vue';
import { defineStore } from 'pinia';
// 引入语言的配置
import il8n from  '@/il8n';


export const useAppConfigStore = defineStore('appConfig', () => {

  // 定义当前的系统语言
  const appLocale = ref('zh');

  // 定义当前的主题
  const appthem = ref('light');

  // 设置当前的系统语言 zh en
  const setLocale = (lan) => {
    il8n.global.locale = lan
  }

  // 设置当前的主题 light dark
  const setTheme = (theme) => {
    appthem.value = theme
  }

  return { appLocale, setLocale, appthem, setTheme }
})
