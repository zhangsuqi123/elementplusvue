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
import path from 'path-browserify';
import fs from 'fs';

// 根据环境加载相应的 .env 文件
const envFiles = {
  development: '.env.development',
  production: '.env.production'
};

let str;
try {
  str = fs.readFileSync('/opt/.crypto_key', 'utf8').trim();
} catch (error) {
  // 获取用户主目录
  const userProfile = process.env.USERPROFILE;
  // 获取用户的桌面路径
  const desktopDir = path.join(userProfile, 'Desktop');

  // 指定你要读取的文件名
  const filename = 'crypto';

  // 构建文件的完整路径
  const filePath = path.join(desktopDir, filename);
  str = fs.readFileSync(filePath, 'utf8').trim();
}

// 加载环境变量
dotenv.config({ path: envFiles[process.env.NODE_ENV] });

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    crypto_key: JSON.stringify(str)
  },
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
