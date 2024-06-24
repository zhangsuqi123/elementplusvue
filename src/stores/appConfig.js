import { defineStore } from 'pinia';
import { h } from 'vue';
import il8n from '@/il8n';
import { getParentMenu, getRoute } from '@/api/menu';
import * as icons from '@ant-design/icons-vue';

// 格式化菜单数据
const fmtMenu = (menuData) => {
  let data = JSON.parse(JSON.stringify(menuData));
  return data.map((item) => {
    return {
      key: item.id,
      label: item.menuname,
      title: item.menuname,
      icon: item.icon ? () => h(icons[item.icon]) : null,
      path: `/${item.url}`,
      children: Array.isArray(item.children) ? fmtMenu(item.children) : null
    };
  });
};

export const useAppConfig = defineStore('appConfig', {
  state: () => ({
    appLocale: il8n.global.locale,
    apptheme: 'light',
    routeData: [],
    menuData: [{
      key: 'Home',
      label: '首页',
      title: '首页',
      icon: () => h(icons.HomeOutlined),
      path: '/'
    }],
    defaultMenuData: [],
    collapsed: false,
    isInit: false,
  }),
  actions: {
    setTheme(theme) {
      this.apptheme = theme;
      localStorage.setItem('theme-appearance', theme);
    },
    async getBasicInfo() {
      return new Promise((resolve, reject) => {
        console.log('已经执行初始化路由');
        Promise.all([this.getmenuData(), this.getRouteData()]).then(async res=>{
          this.menuData.push(...fmtMenu(this.defaultMenuData));
          const loading = document.getElementById('loading');
          if (loading) {
            loading.style.display = 'none';
          }
          this.isInit = true;
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      });
    },
    getmenuData() {
      return new Promise((resolve) => {
        getParentMenu().then(res=> {
          this.defaultMenuData = res;
          resolve(res);
        });
      });
    },
    getRouteData() {
      return new Promise((resolve) => {
        getRoute().then(res=> {
          this.routeData = res;
          resolve(res);
        });
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
    },
  },
  getters: {
    formattedMenu: (state) => fmtMenu(state.defaultMenuData)
  }
});
