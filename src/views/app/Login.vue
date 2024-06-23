<script setup>
import { reactive } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { setCookie } from '@/libs/cookie';
import crypto from '@/libs/crypto-web';
import { login } from '@/api/user';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/stores/app';
import { useAppConfig } from '@/stores/appConfig';
const { setToken } = useAppStore();
const { getBasicInfo } = useAppConfig();
const router = useRouter();
let loading = document.getElementById('loading');

const formState = reactive({
  username: '',
  password: '',
  remember: true
});
const onFinish = async (values) => {
  let userInfo = {
    password: crypto.encode(values.password),
    username: values.username
  };
  login({
    userInfo: crypto.encode(JSON.stringify(userInfo))
  }).then(({ data }) => {
    if (values.remember) {
      setCookie('token', data.token);
    } else {
      window.sessionStorage.setItem('token', data.token);
    }
    setToken(data.token);
    loading.style.display = 'block';
    getBasicInfo();
    router.push('/');
  });
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
</script>
<template>
  <div class="login">
    <div class="login-content">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 18 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          name="username"
          :rules="[{ required: true, message: '请输入用户名！' }]"
          :wrapper-col="{ offset: 3, span: 18 }"
        >
          <a-input v-model:value="formState.username" placeholder="请输入用户名">
            <template #prefix>
              <user-outlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label=""
          name="password"
          :rules="[{ required: true, message: '请输入密码！' }]"
          :wrapper-col="{ offset: 3, span: 18 }"
        >
          <a-input-password v-model:value="formState.password" placeholder="请输入密码">
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item name="remember" class="operation" :wrapper-col="{ offset: 3, span: 18 }">
          <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
          <span class="wang">忘记密码?</span>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 3, span: 18 }">
          <a-button type="primary" :style="{ width: '100%' }" html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style lang="scss">
.login {
  width: 100%;
  background-image: url('@/assets/image/background.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: grid;
  place-items: center; /* 将内容放置在网格的中心 */
  height: 100vh;
}

.login-content {
  width: 600px;
  height: 400px;
  background-color: rgb(255, 255, 255);
  padding-top: 70px;
}

.wang {
  position: absolute;
  right: 0;
  text-decoration: underline;
  cursor: pointer;
}
</style>
