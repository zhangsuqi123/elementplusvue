import { ref } from 'vue'
import { defineStore } from 'pinia'
// 引入语言的配置
import il8n from '@/il8n'

export const useAppConfigStore = defineStore('appConfig', () => {
  // 定义当前的系统语言
  const appLocale = ref('zh')

  // 设置当前的系统语言 zh en
  const setLocale = (lan) => {
    il8n.global.locale = lan
    localStorage.setItem('language', lan)
  }

  // 定义当前的主题
  const apptheme = ref('light')

  // 设置当前的主题 light dark
  const setTheme = (theme) => {
    apptheme.value = theme
    localStorage.setItem('theme-appearance', theme)
  }

  // 定义菜单的展开状态
  const collapsed = ref(false)

  // 设置菜单的展开状态
  const setMenuCollapsed = (value) => {
    collapsed.value = value
  }

  return { appLocale, setLocale, apptheme, setTheme, collapsed, setMenuCollapsed }
})
