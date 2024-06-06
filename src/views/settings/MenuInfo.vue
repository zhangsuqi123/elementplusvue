<template>
  <CardTable title="测试表格" :table-config="gridOptions" :table-columns="tableColumns"></CardTable>
</template>

<script setup>
import { ref, reactive } from 'vue'
import CardTable from '@/components/vxetable/CardTable.vue'
const gridRef = ref()
const footerData = ref([])
const tableColumns = ref([])
const gridOptions = reactive({
  border: true,
  showOverflow: true,
  showHeaderOverflow: true,
  showFooter: true,
  maxHeight: 800,
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
  return new Promise((resolve) => {
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
        tableColumns.value.push(config)
      }
      resolve(columns)
    }, 250)
  })
}
const findDataList = (size) => {
  return new Promise((resolve) => {
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
  gridOptions.loading = true
  gridOptions.tableColumn = []
  await Promise.all([
    findColumnList(50).then((columns) => {
      const $grid = gridRef.value
      if ($grid) {
        gridOptions.tableColumn = columns
        $grid.loadColumn(columns)
      }
    }),
    findDataList(40).then((data) => {
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
  gridOptions.tableColumn.forEach((column, index) => {
    footList[0].push(index === 0 ? '合计' : `${index}`)
  })
  footerData.value = footList
  if ($grid) {
    $grid.updateFooter()
  }
}
init()
</script>
