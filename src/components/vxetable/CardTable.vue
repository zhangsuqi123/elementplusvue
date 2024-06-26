<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, getCurrentInstance } from 'vue';
const { emit } = getCurrentInstance();
const gridRef = ref();

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  tableConfig: {
    type: Object,
    default: () => {}
  },
  tableColumns: {
    type: Array,
    default: () => {}
  },
  tableData: {
    type: Array,
    default: () => {}
  },
  height: {
    type: Number,
    default: 0
  },
  pagerConfig: {
    type: Object,
    default: () => ({})
  },
  tableTotal: {
    type: Number,
    default: 0
  }
});

const getSlot = () => {
  let arr = [];
  props.tableColumns.forEach((item) => {
    if (item.slots) {
      arr.push(Object.values(item.slots)[0]);
    }
  });
  return arr;
};

const pagerConfigs = ref(props.pagerConfig);

const handlePageChange = (pagerConfig) => {
  emit('pager-change', pagerConfig);
};
</script>

<template>
  <a-card
    :bordered="false"
    :style="{
      height: props.height + 'px'
    }"
  >
    <a-card-meta>
      <template #description>
        <slot name="header">
          <span>{{ props.title }}</span>
        </slot>
      </template>
    </a-card-meta>
    <vxe-grid
      ref="gridRef"
      :columns="props.tableColumns"
      :data="props.tableData"
      v-bind="props.tableConfig"
      height="100%"
      size="small"
      :auto-resize="true"
    >
      <template #title v-slot="row">
        <slot name="title" v-bind="row"></slot>
      </template>
      <template v-for="(item, index) in getSlot()" :key="index" #[item]="row">
        <slot :name="item" v-bind="row"> </slot>
      </template>

      <template #pager>
        <!--使用 pager 插槽-->
        <vxe-pager
          :layouts="[
            'PrevJump',
            'PrevPage',
            'Number',
            'NextPage',
            'NextJump',
            'Sizes',
            'FullJump',
            'Total'
          ]"
          v-model:current-page="pagerConfigs.currentPage"
          v-model:page-size="pagerConfigs.pageSize"
          :total="tableTotal"
          @page-change="handlePageChange"
        >
        </vxe-pager>
      </template>
    </vxe-grid>
  </a-card>
</template>
