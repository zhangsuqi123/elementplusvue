import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', () => {
  // 设置
  const token = ref('');

  const setToken = (value) => {
    token.value = value;
  };

  return { token, setToken };
});
