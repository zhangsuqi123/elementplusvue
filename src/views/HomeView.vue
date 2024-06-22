<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import echarts from '@/components/echarts/index.vue'

import io from 'socket.io-client'

const echart = ref(null)

const socket = ref(null)
const dataPoints = ref([]); // 存储数据点
const url = import.meta.env.VITE_WS_URL
onMounted(() => {
  socket.value = io(url, {
    query: {
      room: 'test'
    },
    transports: ['websocket']
  })
  socket.value.on('connect', () => {
    socket.value.emit('osInfo', { msg: 11111 })
    socket.value.on(socket.value.id, (data) => {
      dataPoints.value.push(data.uselv)
      echart.value.echart.setOption({
        series: [{
          data: dataPoints.value
        }]
      })
    })
  })
  // 处理连接失败
  socket.value.on('connect_error', (error) => {
    console.error('Connection failed:', error)
  })
  echart.value.echart.setOption({
    title: {
      text: '内存使用率'
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        show: false
      }
    },
    yAxis: {
      max: 100
    },
    series: [
      {
        name: '使用率',
        type: 'line',
        data: dataPoints.value,
        showSymbol: false,
      }
    ]
  })
})

onBeforeUnmount(() => {
  // 销毁 WebSocket 连接
  if (socket.value) {
    socket.value.disconnect()
  }
})
</script>

<template>
  <echarts ref="echart" :options="{}" style="width: 400px; height: 300px"></echarts>
  <!--<a-card :bordered="false" style="width: 300px; height: 500px">
    <p><span style="color: red">Admin</span>，下午好！欢迎回来！{{ $t('hello') }}</p>
  </a-card>-->
  <!-- <p>
    开源等于互助；开源需要大家一起来支持，支持的方式有很多种，比如使用、推荐、写教程、保护生态、贡献代码、回答问题、分享经验、打赏赞助等；欢迎您加入我们！
  </p> -->
</template>
