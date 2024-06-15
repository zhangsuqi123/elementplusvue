import request from '@/utils/axios';

/**
 * 用户登录接口
 * @param {*} params 
 */
export function login(params) {
  return request({
    url: '/login',
    method: 'post',
    data: params,
  })
}

/**
 * 用户注册接口
 * @param {*} params 
 */
export function regist(params) {
  return request({
    url: '/regist',
    method: 'post',
    data: params,
  })
}