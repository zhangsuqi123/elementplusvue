<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { login } from '@/api/app'
import { useAppConfigStore } from '@/stores/appConfig'

const { setLocale, appLocale } = useAppConfigStore()

const change = () => {
  console.log(appLocale, 'zh')
  if (appLocale === 'zh') {
    console.log('设置为英文语言')
    setLocale('en')
  } else {
    console.log('设置为中文语言')
    setLocale('zh')
  }
}

import io from 'socket.io-client';

console.dir(io)

const socket = ref(null)
const url = import.meta.env.VITE_WS_URL
onMounted(() => {
  const sockets = io(url, {
    query: {
      room: 'test',
    },
    transports: ['websocket']
  })
  sockets.on('connect', () => {
    sockets.emit('room', {msg: 11111})
    sockets.on('qim8A5mvmHtPAkt3AAAB', (data) => {
      console.log(data)
    })
    console.log('Connected to WebSocket server')
  })
  // 处理连接失败
  sockets.on('connect_error', (error) => {
    console.error('Connection failed:', error)
  })
  console.log(sockets.id)
  sockets.on('res', (data) => {
    console.log('Received message:', data)
  })

  // sockets.emit('room', 'Hello Server!')
})

onBeforeUnmount(() => {})
</script>

<template>
  <a-button @click="login">发起请求</a-button>
  <a-button @click="change">切换语言{{ appLocale }}</a-button>
  <a-card :bordered="false" style="width: 300px; height: 500px">
    <p><span style="color: red">Admin</span>，下午好！欢迎回来！{{ $t('hello') }}</p>
  </a-card>
  <!-- <p>
    开源等于互助；开源需要大家一起来支持，支持的方式有很多种，比如使用、推荐、写教程、保护生态、贡献代码、回答问题、分享经验、打赏赞助等；欢迎您加入我们！
  </p> -->
</template>
