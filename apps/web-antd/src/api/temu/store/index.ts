import type { PageParam, PageResult } from '@vben/request';
import type { Dayjs } from 'dayjs';

import { requestClient } from '#/api/request';

export namespace StoreApi {
  /** Temu 店铺授权信息信息 */
  export interface Store {
    id: number; // 自增主键
    shopType?: number; // 店铺类型：1-全托管店铺，2-半托管店铺，3-本土店铺
    shopName?: string; // 自定义店铺名称
    productStockToken: string; // 产品库存 Token
    complianceApiToken: string; // 合规 API Token
    orderShippingTokenUs: string; // 美国订单发货 Token
    orderShippingTokenEu: string; // 欧区订单发货 Token
    orderShippingTokenGlobal: string; // 全球订单发货 Token
    accessToken: string; // 授权token
    shopCurrency: string; // 店铺币种，如 CNY、USD(香港主体店铺) 等
    shopSite: string; // 店铺站点（本土店铺用，如美国、法国等）
    authStatus?: number; // 授权状态：0-未授权，1-已授权，2-已过期，3-已取消
    authTime: string | Dayjs; // 授权时间
    apiScopeList: string; // API权限列表，JSON格式存储
    appSubscribeEventCodeList: string; // 应用订阅事件列表，JSON格式存储
    appSubscribeStatus: number; // 应用订阅状态：0-未订阅，1-已订阅
    authEventCodeList: string; // 授权事件代码列表，JSON格式存储
    expiredTime: number; // 过期时间戳，如：1765634102
    mallId: number; // 商城ID，如：1024
    regionId: number; // 地区id
    mallType: number; // 商店类型
  }
}

/** 查询Temu 店铺授权信息分页 */
export function getStorePage(params: PageParam) {
  return requestClient.get<PageResult<StoreApi.Store>>('/temu/store/page', { params });
}

/** 查询Temu 店铺授权信息详情 */
export function getStore(id: number) {
  return requestClient.get<StoreApi.Store>(`/temu/store/get?id=${id}`);
}

/** 新增Temu 店铺授权信息 */
export function createStore(data: StoreApi.Store) {
  return requestClient.post('/temu/store/create', data);
}

/** 修改Temu 店铺授权信息 */
export function updateStore(data: StoreApi.Store) {
  return requestClient.put('/temu/store/update', data);
}

/** 删除Temu 店铺授权信息 */
export function deleteStore(id: number) {
  return requestClient.delete(`/temu/store/delete?id=${id}`);
}

/** 批量删除Temu 店铺授权信息 */
export function deleteStoreList(ids: number[]) {
  return requestClient.delete(`/temu/store/delete-list?ids=${ids.join(',')}`)
}

/** 导出Temu 店铺授权信息 */
export function exportStore(params: any) {
  return requestClient.download('/temu/store/export-excel', params);
}


/** 新增Temu 店铺授权信息 */
export function authorizeShop(data: StoreApi.Shop) {
  return requestClient.post(`/temu/shop/authorize?id=${data.id}`);
}
