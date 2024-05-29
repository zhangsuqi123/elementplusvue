import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppConfigStore = defineStore('appConfig', () => {
  // 定义当前的系统语言
  const appLocale = ref('zh')
  // 设置当前的系统语言
  const setLocale = (locale) => {
    appLocale.value = locale
  }

  return { appLocale, setLocale }
})
