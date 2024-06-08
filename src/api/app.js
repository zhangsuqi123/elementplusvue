import request from '@/utils/axios';

export function login(params) {
  request({
    url: '/login',
    data: params,
    method: 'post'
  })
}