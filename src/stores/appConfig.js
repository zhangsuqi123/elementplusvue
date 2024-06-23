import { defineStore } from 'pinia';
// 引入语言的配置
import il8n from '@/il8n';
import { getParentMenu, getRoute } from '@/api/menu';
import router from '@/router';
const modules = import.meta.glob('@/views/**/*.vue');

export const useAppConfig = defineStore('appConfig', {
  state:() => ({
    appLocale: il8n.global.locale,
    apptheme: 'light',
    routeData: [],
    menuData: [],
    collapsed: false,
    isInit: false
  }),
  actions: {
    setTheme(theme) {
      this.apptheme = theme;
      localStorage.setItem('theme-appearance', theme);
    },
    getBasicInfo() {
      Promise.all([getParentMenu(), getRoute()])
      .then((res) => {
        this.menuData = res[0];
        this.routeData = res[1];
        let routearr = this.routeData.map(async item => {
          const componentPath = `/src/views/${item.component}.vue`;
          if (modules[componentPath]) {
            const component = await modules[componentPath]();
            router.addRoute({
              path: `/${item.url}`,
              name: item.route,
              component: component.default
            });
          }
        });
        router.addRoute(...routearr);
        let loading = document.getElementById('loading');
        loading.style.display = 'none';
      })
      .catch((err) => {
        console.log(err);
        let loading = document.getElementById('loading');
        loading.style.display = 'none';
      });
    },
    setLocale(lan) {
      this.appLocale = lan;
      il8n.global.locale = lan;
      localStorage.setItem('language', lan);
    },
    setMenuCollapsed(value) {
      this.collapsed = value;
    },
    setInit(value) {
      this.isInit = value;
    }
  }
});
