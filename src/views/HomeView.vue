<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { fmtdate } from '@/libs/date';
import echarts from '@/components/Card/CardEcharts.vue';
import CardBasic from '@/components/Card/CardBasic.vue';

import io from 'socket.io-client';

const echart = ref(null);

const socket = ref(null);
const dataPoints = ref([]); // 存储数据点
const url = import.meta.env.VITE_WS_URL;
const options = ref({
  xAxis: {
    type: 'category',
    axisLabel: {
      show: false
    }
  },
  yAxis: {
    max: 100,
    axisLabel: {
      formatter: '{value}%'
    }
  },
  series: {
    name: '使用率',
    type: 'line',
    data: [],
    showSymbol: false
  }
});
const osInfo = ref({});
onMounted(() => {
  socket.value = io(url, {
    query: {
      room: 'test'
    },
    transports: ['websocket']
  });
  socket.value.on('connect', () => {
    socket.value.emit('osInfo', { msg: 11111 });
    socket.value.on(socket.value.id, (data) => {
      if (data.uselv.length > 2) {
        dataPoints.value.push(...data.uselv);
        osInfo.value = data;
      } else {
        dataPoints.value.shift();
        dataPoints.value.push(data.uselv);
        osInfo.value = data;
      }
      echart.value.$refs.chart.echart.setOption({
        series: {
          data: dataPoints.value
        }
      });
    });
  });
  // 处理连接失败
  socket.value.on('connect_error', (error) => {
    console.error('Connection failed:', error);
  });
  options.value.series.data = dataPoints.value;
});

onBeforeUnmount(() => {
  // 销毁 WebSocket 连接
  if (socket.value) {
    socket.value.disconnect();
  }
});
</script>

<template>
  <a-row :gutter="16">
    <a-col :span="4">
      <echarts ref="echart" title="内存使用率" :options="options"></echarts>
    </a-col>
    <a-col :span="10">
      <CardBasic title="系统信息">
        操作平台: {{ osInfo.platform }}
        CPU架构: {{ osInfo.arch }}
        内核数：{{ osInfo.cpuCount }}
        系统运行时长：{{ fmtdate(osInfo.uptime) }}
        主机名称： {{ osInfo.hostname }}
      </CardBasic>
    </a-col>
  </a-row>
  <!--<a-card :bordered="false" style="width: 300px; height: 500px">
    <p><span style="color: red">Admin</span>，下午好！欢迎回来！{{ $t('hello') }}</p>
  </a-card>-->
  <!-- <p>
    开源等于互助；开源需要大家一起来支持，支持的方式有很多种，比如使用、推荐、写教程、保护生态、贡献代码、回答问题、分享经验、打赏赞助等；欢迎您加入我们！
  </p> -->
</template>
