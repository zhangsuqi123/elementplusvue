import {
  // 全局实例对象
  // VXETable,

  // 可选表格模块
  // VxeTableFilterModule,
  // VxeTableEditModule,
  // VxeTableMenuModule,
  // VxeTableExportModule,
  // VxeTableKeyboardModule,
  // VxeTableValidatorModule,
  // VxeTableCustomModule,

  // 可选组件
  VxeIcon,
  VxeTable,
  VxeColumn,
  VxeColgroup,
  VxeGrid,
  Edit,
  // VxeTooltip,
  // VxeToolbar,
  // VxePager,
  // VxeForm,
  // VxeFormItem,
  // VxeFormGather,
  // VxeCheckbox,
  // VxeCheckboxGroup,
  // VxeRadio,
  // VxeRadioGroup,
  // VxeRadioButton,
  // VxeSwitch,
  // VxeInput,
  // VxeSelect,
  // VxeOptgroup,
  // VxeOption,
  // VxeTextarea,
  VxeButton,
  // VxeButtonGroup,
  VxeModal,
  // VxeDrawer,
  // VxeList,
  // VxePulldown
} from 'vxe-table'
  // ...
// 导入主题变量，也可以重写主题变量
import 'vxe-table/styles/cssvar.scss';
import 'vxe-table/lib/style.css'
// 导入默认的语言
//   import zhCN from 'vxe-table/es/locale/lang/zh-CN'

// 按需加载的方式默认是不带国际化的，自定义国际化需要自行解析占位符 '{0}'，例如：
//   VXETable.setConfig({
//     i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args)
//   })

export function LazyVxeUITable (app) {
  // 可选表格模块
  // app.use(VxeTableFilterModule)
  // app.use(VxeTableEditModule)
  // app.use(VxeTableMenuModule)
  // app.use(VxeTableExportModule)
  // app.use(VxeTableKeyboardModule)
  // app.use(VxeTableValidatorModule)
  // app.use(VxeTableCustomModule)

  // 可选组件
  app.use(VxeIcon)
  app.use(VxeTable)
  app.use(VxeColumn)
  app.use(VxeColgroup)
  app.use(VxeGrid)
  app.use(Edit)
  // app.use(VxeTooltip)
  // app.use(VxeToolbar)
  // app.use(VxePager)
  // app.use(VxeForm)
  // app.use(VxeFormItem)
  // app.use(VxeFormGather)
  // app.use(VxeCheckbox)
  // app.use(VxeCheckboxGroup)
  // app.use(VxeRadio)
  // app.use(VxeRadioGroup)
  // app.use(VxeRadioButton)
  // app.use(VxeSwitch)
  // app.use(VxeInput)
  // app.use(VxeSelect)
  // app.use(VxeOptgroup)
  // app.use(VxeOption)
  // app.use(VxeTextarea)
  app.use(VxeButton)
  // app.use(VxeButtonGroup)
  app.use(VxeModal)
  // app.use(VxeDrawer)
  // app.use(VxeList)
  // app.use(VxePulldown)
}