/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 2021
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 1 : 0, // 开发可用console和debugger，生产不可用
    'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0,
    // 'no-template-curly-in-string': 0,
    // 'vue/no-mutating-props': 0,
    // 多字
    'vue/multi-word-component-names': 0,
    // 'vue/no-deprecated-dollar-listeners-api': 0,
    // slot属性
    // 'vue/no-deprecated-slot-attribute': 0,
    // prop 不允许修改
    'vue/no-mutating-props': 0,
    'vue/no-lone-template': 0,
    'spaced-comment': ['error', 'always'],
    semi: 2, // 关闭无效分号
    indent: [2, 2, { SwitchCase: 1 }], // 缩进两个，警告
    // "indent": 0,
    'no-useless-escape': 0, // 特殊字符可以使用
    // 声明没使用关闭
    'no-unused-vars': [
      1,
      {
        vars: 'all',
        args: 'none'
      }
    ],
    'vue/no-side-effects-in-computed-properties': 'off', // 计算属性可以有副作用
    'no-empty': 'off', // 允许空块语句
    'no-undef': 2,
    'no-undef-init': 2,
    'comma-style': [2, 'last'], // 逗号在行尾
    eqeqeq: [
      // 只能使用 ===
      'error',
      'always'
    ],
    quotes: [1, 'single'],
    'comma-dangle': 'off',
    'no-multiple-empty-lines': 'error', // 禁止空行
    // "new-cap": ["error", {
    //   "newIsCap": true
    // }], // 构造函数必须首字母必须大写
    'no-proto': 2, // 禁用 __proto__ 属性
    'default-case': 2, // switch 语句强制 default 分支
    'no-loop-func': 1, // 禁止在循环中出现 function 声明和表达式
    'no-delete-var': 2, // 禁止删除变量
    'no-catch-shadow': 2, // 禁止catch子句参数与外部作用域变量同名
    'no-class-assign': 2, // 禁止给类赋值
    'no-const-assign': 2, // 禁止修改const声明的变量
    'no-dupe-keys': 2, // 在创建对象字面量时不允许键重复 {a:1,a:1}
    'no-var': 1, // 禁用var，用let和const代替
    'arrow-parens': 0, // 关闭箭头函数用小括号括起来
    camelcase: 0, // 强制驼峰法命名
    'valid-typeof': 2, // 必须使用合法的typeof的值
    'space-after-keywords': [0, 'always'], // 关闭关键字后面是否要空一格
    'space-before-blocks': [0, 'always'], // 关闭不以新行开始的块{前面要不要有空格
    'space-before-function-paren': [0, 'always'], // 关闭函数定义时括号前面要不要有空格
    'space-in-parens': [0, 'never'], // 关闭小括号里面要不要有空格
    'space-infix-ops': 1, // 开启中缀操作符周围要不要有空格,+—*/前后都要有空格
    'constructor-super': 0, // 非派生类不能调用super，派生类必须调用super
    'newline-after-var': 0, // 变量声明后是否需要空一行
    'no-new-wrappers': 2, // 禁止使用new创建包装实例，new String new Boolean new Number
    'keyword-spacing': 2, // 关键字前后的空格,如if
    'no-constant-condition': 0, // 条件语句的条件中不允许出现恒定不变的量
    'sort-vars': 0, // 变量声明时排序
    'no-cond-assign': 0,
    'no-plusplus': 0, // 不允许使用++ --运算符,
    'no-multi-spaces': 0,
    'key-spacing': 0,
    'no-trailing-spaces': 0,
    'object-curly-spacing': 0,
    'vue/require-valid-default-prop': 0,
    'no-unused-expressions': 0,
    'vue/no-v-html': 'off',
    'no-new': 0,
    'no-useless-constructor': 0,
    'vue/return-in-computed-property': 0
  }
};
