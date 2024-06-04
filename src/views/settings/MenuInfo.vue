<template>
  <a-card title="Card title" :bordered="false">
    <vxe-grid ref="gridRef" v-bind="gridOptions"></vxe-grid>
  </a-card>
  <!-- <el-card>
    <template #header>Yummy hamburger</template>
    
  </el-card> -->
</template>

<script setup>
import { ref, reactive } from 'vue'
const gridRef = ref()
const footerData = ref([])
const gridOptions = reactive({
  border: true,
  showOverflow: true,
  showHeaderOverflow: true,
  showFooterOverflow: true,
  showFooter: true,
  height: 880,
  loading: false,
  scrollX: {
    enabled: true
  },
  scrollY: {
    enabled: true
  },
  rowConfig: {
    keyField: 'id'
  },
  checkboxConfig: {
    labelField: 'id'
  }
})
let colIndex = 0
let rowIndex = 1
const findColumnList = (size) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const columns = []
      for (let index = 0; index < size; index++) {
        const key = colIndex++
        const config = {
          field: key ? `col_${key}` : 'id',
          title: key ? `标题_${key}` : 'ID',
          width: 140,
          type: null,
          fixed: null
        }
        if (!key) {
          config.type = 'checkbox'
        }
        if (key < 2) {
          config.fixed = 'left'
        }
        columns.push(config)
      }
      resolve(columns)
    }, 250)
  })
}
const findDataList = (size) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const list = []
      for (let index = 0; index < size; index++) {
        const key = rowIndex++
        const item = { id: key, checked: false }
        // 由于生成数据比较耗时，所以固定生成1000字段
        Array.from(new Array(1000)).forEach((num, cIndex) => {
          item[`col_${cIndex}`] = `内容_${cIndex}_${index}`
        })
        list.push(item)
      }
      resolve(list)
    }, 250)
  })
}
const init = async () => {
  let tableColumn = []
  gridOptions.loading = true
  await Promise.all([
    findColumnList(50).then(columns => {
      const $grid = gridRef.value
      if ($grid) {
        tableColumn = columns
        $grid.loadColumn(columns)
      }
    }),
    findDataList(40).then(data => {
      const $grid = gridRef.value
      if ($grid) {
        $grid.loadData(data)
      }
    })
  ])
  const $grid = gridRef.value
  gridOptions.loading = false
  // 计算表尾数据
  const footList = [[]]
  tableColumn.forEach((column, index) => {
    footList[0].push(index === 0 ? '合计' : `${index}`)
  })
  footerData.value = footList
  if ($grid) {
    $grid.updateFooter()
  }
}
init()
</script>
