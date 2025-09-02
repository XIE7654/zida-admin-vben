import type { PageParam, PageResult } from '@vben/request';
import type { Dayjs } from 'dayjs';

import { requestClient } from '#/api/request';

export namespace StoreApi {
  /** eBay店铺信息 */
  export interface Store {
    id: number; // 自增主键
    shopName?: string; // 自定义店铺名称
    ebayAccount: string; // eBay登录账号
    site?: string; // 所属站点（美国/英国/德国等）
    keepZeroStockOnline: boolean; // 是否保持零库存在线（1=是，0=否）
    authorizationType: string; // 授权类型（API授权/手动授权等）
    apiKeyExpireTime: string | Dayjs; // 到期时间
    listingQuota: number; // 商品刊登额度上限
    isManagedPayment: boolean; // 是否启用eBay管理支付（1=启用，0=未启用）
    accessToken: string; // 令牌
    accessTokenExpiresIn: string | Dayjs; // 令牌过期时间
    refreshToken: string; // 刷新令牌
    refreshTokenExpiresIn: string | Dayjs; // 刷新令牌过期时间
  }
}

/** 查询eBay店铺分页 */
export function getStorePage(params: PageParam) {
  return requestClient.get<PageResult<StoreApi.Store>>('/ebay/store/page', { params });
}

/** 查询eBay店铺详情 */
export function getStore(id: number) {
  return requestClient.get<StoreApi.Store>(`/ebay/store/get?id=${id}`);
}

/** 新增eBay店铺 */
export function createStore(data: StoreApi.Store) {
  return requestClient.post('/ebay/store/create', data);
}

/** 修改eBay店铺 */
export function updateStore(data: StoreApi.Store) {
  return requestClient.put('/ebay/store/update', data);
}

/** 删除eBay店铺 */
export function deleteStore(id: number) {
  return requestClient.delete(`/ebay/store/delete?id=${id}`);
}

/** 批量删除eBay店铺 */
export function deleteStoreList(ids: number[]) {
  return requestClient.delete(`/ebay/store/delete-list?ids=${ids.join(',')}`)
}

/** 导出eBay店铺 */
export function exportStore(params: any) {
  return requestClient.download('/ebay/store/export-excel', params);
}

/** 授权eBay店铺 */
export function AuthorizeStore(data: StoreApi.Store) {
  return requestClient.get(`/ebay/store/oauth/consent-url?id=${data.id}`);
}


/** 使用授权码交换eBay OAuth令牌 */
export function exchangeOAuthToken(data: any) {
  return requestClient.post('/ebay/store/oauth/exchange-token', data);
}

/** 使用授权码交换eBay OAuth令牌 */
export function refreshOAuthToken(data: any) {
  return requestClient.post('/ebay/store/oauth/refresh-token', data);
}
