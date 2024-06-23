import request from '@/utils/axios';

/**
 * 获取菜单数据
 * @param {*} object
 * @method get
 * @returns Promise
 */
export function GetMenuData(params) {
  return request({
    url: '/menu',
    method: 'get',
    params
  });
}

/**
 * 添加菜单
 * @param {id} Object
 * @method post
 * @returns Promise
 */
export function AddMenu(params) {
  return request({
    url: '/menu',
    method: 'post',
    data: params
  });
}

/**
 * 修改菜单
 * @param {id} Object
 * @method put
 * @returns Promise
 */
export function EditMenu(params) {
  return request({
    url: `/menu/${params.id}`,
    method: 'put',
    data: params
  });
}

/**
 * 删除菜单
 * @param {id} Object
 * @method delete
 * @returns Promise
 */
export function DelMenu(params) {
  return request({
    url: `/menu/${params.id}`,
    method: 'delete'
  });
}

/**
 * 获取菜单信息
 */
export function getParentMenu() {
  return request({
    url: '/getDirectory',
    method: 'post'
  });
}

/**
 * 获取路由信息
 */
export function getRoute() {
  return request({
    url: '/getRoute',
    method: 'post'
  });
}
