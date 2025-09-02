import type { PageParam, PageResult } from '@vben/request';
import type { Dayjs } from 'dayjs';

import { requestClient } from '#/api/request';

export namespace OrderApi {
  /** Temu订单信息 */
  export interface Order {
    id: number; // 主键自增ID
    shopId?: number; // 店铺id
    parentOrderSn?: string; // 订单号
    parentOrderStatus?: number; // 订单状态
    parentOrderTime?: number; // 创建时间
    expectShipLatestTime: number; // 最晚发货时间
    parentOrderPendingFinishTime: number; // 待处理状态结束时间
    latestDeliveryTime: number; // 最晚送达时间
    parentShippingTime: number; // 订单发货时间
    siteId?: number; // 站点ID
    regionId?: number; // 地区ID
    parentOrderLabel: string; // 订单状态标签
    fulfillmentWarning: string; // 履约提示列表
    hasShippingFee: boolean; // 用户实际支付运费是否为0
    shippingMethod?: number; // 配送渠道类型
    orderPaymentType: string; // 订单支付类型
    batchOrderNumberList: string; // 批次订单号列表
    orderList?: string; // 子订单信息列表
  }
}

/** 查询Temu订单分页 */
export function getOrderPage(params: PageParam) {
  return requestClient.get<PageResult<OrderApi.Order>>('/temu/order/page', { params });
}

/** 查询Temu订单详情 */
export function getOrder(id: number) {
  return requestClient.get<OrderApi.Order>(`/temu/order/get?id=${id}`);
}

/** 新增Temu订单 */
export function createOrder(data: OrderApi.Order) {
  return requestClient.post('/temu/order/create', data);
}

/** 修改Temu订单 */
export function updateOrder(data: OrderApi.Order) {
  return requestClient.put('/temu/order/update', data);
}

/** 删除Temu订单 */
export function deleteOrder(id: number) {
  return requestClient.delete(`/temu/order/delete?id=${id}`);
}

/** 批量删除Temu订单 */
export function deleteOrderList(ids: number[]) {
  return requestClient.delete(`/temu/order/delete-list?ids=${ids.join(',')}`)
}

/** 导出Temu订单 */
export function exportOrder(params: any) {
  return requestClient.download('/temu/order/export-excel', params);
}


/** 同步Temu订单 */
export function syncAllOrders() {
  return requestClient.post('/temu/order/sync-all');
}

/** 同步Temu订单 */
export function syncOrderDetail(id: number) {
  return requestClient.post(`/temu/order/sync-order-detail?id=${id}`);
}

/** 同步Temu订单 */
export function syncOrderAddress(id: number) {
  return requestClient.post(`/temu/order/sync-shipping-info?id=${id}`);
}
