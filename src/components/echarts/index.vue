<template>
  <v-chart
    ref="echart"
    :option="mergedOptions"
    :autoresize="true"
    style="width: 100%; height: 100%"
  ></v-chart>
</template>

<script>
import { defineComponent, computed } from 'vue';
import ECharts from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
]);

export default defineComponent({
  name: 'Chart',
  components: {
    'v-chart': ECharts
  },
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const defaultOptions = {
      title: {
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal'
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false
      },
      yAxis: {
        type: 'value'
      }
    };

    const echart = null;

    const mergedOptions = computed(() => {
      return {
        ...defaultOptions,
        ...props.options
      };
    });

    return {
      mergedOptions,
      echart
    };
  }
});
</script>

<style scoped>
/* Add any necessary styles here */
</style>
