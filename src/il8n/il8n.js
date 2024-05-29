import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import zh from './locales/zh.json';
import { useAppConfigStore } from '@/stores/app';
console.log(useAppConfigStore())

const messages = {
  en,
  zh
};

const i18n = createI18n({
  locale: 'zh', // 设置默认语言
  fallbackLocale: 'zh', // 设置回退语言
  messages,
});

export default i18n;
