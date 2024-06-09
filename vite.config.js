/* eslint-disable no-undef */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver, AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { VxeTableResolver } from '@vxecli/import-unplugin-vue-components';
import dotenv from 'dotenv';

const envFiles = {
  development: '.env.development',
  production: '.env.production'
};

dotenv.config({ path: envFiles[process.env.NODE_ENV] });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        VxeTableResolver(),
        ElementPlusResolver(),
        AntDesignVueResolver({
          importStyle: false
        })
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "@/assets/theme/_theme.scss";
        @import "@/assets/variables/_light.scss";
        @import "@/assets/variables/_dark.scss";
        `
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_BASE_URL, // 设置你要代理的目标地址
        changeOrigin: true, // 将请求头中的 host 配置为 target
        rewrite: path => path.replace(/^\/api/, '') // 可选的重写路径
      }
    }
  }
})
