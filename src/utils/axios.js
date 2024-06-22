import axios from 'axios'
import { message } from 'ant-design-vue'
import router from '@/router'

const instance = axios.create({
  // 可以在这里设置基础的axios配置，例如baseURL，timeout等
  baseURL: '/api/',
  timeout: 1000 * 60 * 30
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，比如设置token等
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const { data } = response
    if (data.message) {
      message.success(data.message)
    }

    return data
  },
  (error) => {
    const { response } = error
    if (response?.data.message || error.message) {
      message.error(response?.data.message || error.message)
    }
    if (response.status === 403) {
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default instance
