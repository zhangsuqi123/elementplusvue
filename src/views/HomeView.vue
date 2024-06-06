<script setup>
import { ref } from 'vue';
// import { useCounterStore } from '@/stores/counter';

// import { useAppConfigStore } from '@/stores/appConfig';

// const { setLocale } = useAppConfigStore()
// const { increment, $state } = useCounterStore();
// import { Button } from 'ant-design-vue';
import 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-okaidia.css';
const code = ref(`
  function helloWorld() {
    console.log('Hello, World!');
  }
  helloWorld();
`);
</script>

<template>
  <a-card :bordered="false" style="width: 300px">
    <p><span style="color: red">Admin</span>，下午好！欢迎回来！</p>
  </a-card>
  <pre><code class="language-javascript">{{ code }}</code></pre>
  <!-- <p>
    开源等于互助；开源需要大家一起来支持，支持的方式有很多种，比如使用、推荐、写教程、保护生态、贡献代码、回答问题、分享经验、打赏赞助等；欢迎您加入我们！
  </p> -->
</template>
