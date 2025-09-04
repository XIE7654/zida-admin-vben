import type { PageParam, PageResult } from '@vben/request';
import type { Dayjs } from 'dayjs';

import { requestClient } from '#/api/request';

export namespace ProductSkuApi {
  /** Temu SKU明细信息 */
  export interface ProductSku {
    id: number; // 编号
    skuId?: number; // SKU唯一ID
    goodsId?: number; // 所属商品ID
    goodsName?: string; // 所属商品名称
    skuSn: string; // 平台SKU编码
    specName: string; // SKU规格名称
    currency: string; // 货币类型
    price: number; // SKU售价
    retailPriceAmount: number; // 零售价金额
    retailPriceCurrency: string; // 零售价货币
    stock: number; // SKU单独库存
    thumbUrl: string; // SKU缩略图URL
    crtTime: number; // SKU创建时间
    skuStatusChangeTime: string; // SKU状态变更时间
    status4vo: number; // SKU状态
    subStatus4vo: number; // SKU子状态
    skuShowSubStatus4vo: number; // SKU展示子状态
    goodsIsOnSale: number; // 所属商品是否在售
    lowTrafficTag: number; // 低流量标签
    restrictedTrafficTag: number; // 流量受限标签
    weight: number; // SKU重量
    weightUnit: string; // 重量单位
    length: number; // SKU长度
    width: number; // SKU宽度
    height: number; // SKU高度
    volumeUnit: string; // 体积单位
  }
}

/** 查询Temu SKU明细分页 */
export function getProductSkuPage(params: PageParam) {
  return requestClient.get<PageResult<ProductSkuApi.ProductSku>>('/temu/product-sku/page', { params });
}

/** 查询Temu SKU明细详情 */
export function getProductSku(id: number) {
  return requestClient.get<ProductSkuApi.ProductSku>(`/temu/product-sku/get?id=${id}`);
}

/** 新增Temu SKU明细 */
export function createProductSku(data: ProductSkuApi.ProductSku) {
  return requestClient.post('/temu/product-sku/create', data);
}

/** 修改Temu SKU明细 */
export function updateProductSku(data: ProductSkuApi.ProductSku) {
  return requestClient.put('/temu/product-sku/update', data);
}

/** 删除Temu SKU明细 */
export function deleteProductSku(id: number) {
  return requestClient.delete(`/temu/product-sku/delete?id=${id}`);
}

/** 批量删除Temu SKU明细 */
export function deleteProductSkuList(ids: number[]) {
  return requestClient.delete(`/temu/product-sku/delete-list?ids=${ids.join(',')}`)
}

/** 导出Temu SKU明细 */
export function exportProductSku(params: any) {
  return requestClient.download('/temu/product-sku/export-excel', params);
}