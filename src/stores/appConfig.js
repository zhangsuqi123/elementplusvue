import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppConfigStore = defineStore('appConfig', () => {
  // 定义当前的系统语言
  const appLocale = ref('zh');
  // 定义当前的主题
  const appthem = ref('light');
  // 设置当前的系统语言 zh en
  const setLocale = (locale) => {
    appLocale.value = locale
  }
  // 设置当前的主题 light dark
  const setTheme = (theme) => {
    appthem.value = theme
  }

  return { appLocale, setLocale, appthem, setTheme }
})
