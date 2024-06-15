<template>
  <CardTable
    title="菜单信息"
    :table-config="gridOptions"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-total="tableTotal"
    :pager-config="pagerConfig"
    @pager-change="pageChange"
  >
    <template #header>
      <a-button
        type="primary"
        @click="
          modal2Visible = true
          type = 'add'
        "
        >添加菜单</a-button
      >
    </template>
    <template #operation="{ row }">
      <a-button style="margin-right: 10px" @click="edit(row)" size="small">编辑</a-button>
      <a-button type="primary" danger @click="del(row)" size="small">删除</a-button>
    </template>
  </CardTable>
  <a-modal
    v-model:open="modal2Visible"
    title="添加菜单"
    :width="800"
    centered
    :footer="null"
    @cancel="cancel"
  >
    <a-form
      ref="formRef"
      name="advanced_search"
      class="ant-advanced-search-form"
      :model="menuInfo"
      :labelCol="{ span: 5 }"
    >
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item name="ID" label="ID">
            <a-input v-model:value="menuInfo.id" disabled placeholder="该项由后端生成"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item name="菜单名称" label="菜单名称">
            <a-input v-model:value="menuInfo.menuname" placeholder="请输入菜单名称"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item name="英文名称" label="英文名称">
            <a-input v-model:value="menuInfo.enname" placeholder="请输入英文名称"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item name="图标" label="图标">
            <a-input v-model:value="menuInfo.icon" placeholder="请输入菜单的图标名称"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item name="路由" label="路由">
            <a-input v-model:value="menuInfo.route" placeholder="请输入路由"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item name="url后缀" label="url后缀">
            <a-input v-model:value="menuInfo.url" placeholder="请输入URL"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item name="组件" label="组件">
            <a-input v-model:value="menuInfo.component" placeholder="请输入组件"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item name="菜单类型" label="菜单类型">
            <a-select ref="select" v-model:value="menuInfo.types" placeholder="请选择菜单类型">
              <a-select-option value="P">页面</a-select-option>
              <a-select-option value="D">目录</a-select-option>
              <a-select-option value="H">外链</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item name="超链接" label="超链接">
            <a-input v-model:value="menuInfo.href" placeholder="请输入外链地址"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item name="菜单可见" label="菜单可见">
            <a-switch v-model:checked="menuInfo.show" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <div style="text-align: center">
      <a-button style="margin-right: 20px" @click="reset">重置</a-button>
      <a-button type="primary" @click="submit">提交</a-button>
    </div>
  </a-modal>
</template>

<script setup>
import { ref, reactive, onMounted, createVNode } from 'vue'
import CardTable from '@/components/vxetable/CardTable.vue'
import { GetMenuData, AddMenu, EditMenu, DelMenu } from '@/api/menu'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'
// 表格列
const tableColumns = ref([
  {
    title: 'ID',
    field: 'id'
  },
  {
    title: '菜单名称',
    field: 'menuname'
  },
  {
    title: '英文名称',
    field: 'enname'
  },
  {
    title: '菜单图标',
    field: 'icon'
  },
  {
    title: '路由',
    field: 'route'
  },
  {
    title: 'URL后缀',
    field: 'url'
  },
  {
    title: '组件',
    field: 'component'
  },
  {
    title: '类型',
    field: 'types',
    formatter: ({ row }) => {
      if (row.types === 'H') {
        return '超链接'
      } else if (row.types === 'D') {
        return '目录'
      }
      return '页面'
    }
  },
  {
    title: '超链接',
    field: 'href'
  },
  {
    title: '是否可见',
    field: 'show',
    formatter: ({ row }) => {
      if (row.show) {
        return '是'
      }
      return '否'
    }
  },
  {
    title: '操作',
    slots: {
      default: 'operation'
    }
  }
])
// 表格数据
const tableData = ref([])
// 展示添加和修改的弹窗
const modal2Visible = ref(false)

// 定义表格的总条数
const tableTotal = ref(0)
// 定义表格的分页
const pagerConfig = ref({
  currentPage: 1,
  pageSize: 15
})
// 表格的配置项
const gridOptions = reactive({
  border: true, // 是否带有边框
  showOverflow: true, // 主体内容过长时展示省略号
  align: 'center', // 表格所有的列居中
  stripe: true, // 斑马格
  showHeaderOverflow: true, // 表格列名过长时展示省略号
  loading: false // 是否展示loading
})

// 定义一个原始数据的对象
const oldMenuInfo = ref({})
const type = ref('add')
// 定义添加/修改表格的字段
const menuInfo = ref({
  menuname: '',
  id: '',
  icon: '',
  route: '',
  url: '',
  component: '',
  types: 'P',
  href: '',
  show: true,
  enname: ''
})

// 点击确认添加菜单
const submit = async () => {
  if (type.value === 'add') {
    await AddMenu(menuInfo.value)
  } else if (type.value === 'edit') {
    await EditMenu(menuInfo.value)
  }
  getData()
  modal2Visible.value = false
}

onMounted(() => {
  getData()
})
const getData = () => {
  gridOptions.loading = true
  GetMenuData({
    currentPage: pagerConfig.value.currentPage,
    pageSize: pagerConfig.value.pageSize
  }).then((res) => {
    const { data } = res
    tableData.value = data.data
    tableTotal.value = data.count
    gridOptions.loading = false
  })
}

// 点击修改按钮的事件
const edit = (row) => {
  type.value = 'edit'
  let rowData = JSON.parse(JSON.stringify(row))
  delete rowData._X_ROW_KEY
  rowData.show = Boolean(rowData.show)
  // 对处理后的进行深浅拷贝保证不是一个数据  不然后续调用会一直更改
  oldMenuInfo.value = JSON.parse(JSON.stringify(rowData))
  menuInfo.value = rowData
  modal2Visible.value = true
}

// 点击删除按钮的事件
const del = (row) => {
  Modal.confirm({
    title: '提示',
    icon: createVNode(ExclamationCircleOutlined),
    centered: true,
    content: '请确认是否删除该菜单',
    okText: '确认',
    cancelText: '取消',
    async onOk() {
      await DelMenu(row)
      getData()
    },
    onCancel() {}
  })
}

// 点击重置按钮把数据给重置
const reset = () => {
  if (type.value === 'add') {
    menuInfo.value = {
      menuname: '',
      id: '',
      icon: '',
      route: '',
      url: '',
      component: '',
      types: 'P',
      href: '',
      show: true,
      enname: ''
    }
  } else {
    menuInfo.value = oldMenuInfo.value
  }
}
const pageChange = ({ currentPage, pageSize }) => {
  pagerConfig.value.pageSize = pageSize
  pagerConfig.value.currentPage = currentPage
  getData()
}

const cancel = () => {
  menuInfo.value = {
    menuname: '',
    id: '',
    icon: '',
    route: '',
    url: '',
    component: '',
    types: 'P',
    href: '',
    show: true,
    enname: ''
  }
}
</script>
