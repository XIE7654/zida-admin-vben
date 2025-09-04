import type { PageParam, PageResult } from '@vben/request';
import type { Dayjs } from 'dayjs';

import { requestClient } from '#/api/request';

export namespace ProductSpuApi {
  /** Temu SPU信息 */
  export interface ProductSpu {
    id: number; // 编号
    goodsId?: number; // 商品唯一ID
    goodsName?: string; // 商品名称
    outGoodsSn: string; // 商家自定义商品编码
    catId: number; // 商品所属类目ID
    currency: string; // 货币类型
    marketPrice: number; // 市场价格
    price: number; // 商品售价
    retailPriceAmount: number; // 零售价金额
    retailPriceCurrency: string; // 零售价货币
    listPriceAmount: number; // 标价金额
    listPriceCurrency: string; // 标价货币
    quantity: number; // 商品总库存
    thumbUrl: string; // 商品缩略图URL
    crtTime: number; // 商品创建时间
    goodsStatusChangeTime: string; // 商品状态变更时间
    goodsShowSubStatus: number; // 商品展示子状态
    status4vo: number; // 商品状态
    subStatus4vo: number; // 商品子状态
    lowTrafficTag: number; // 低流量标签
    restrictedTrafficTag: number; // 流量受限标签
    costTemplateId: string; // 成本模板ID
    shipmentLimitSecond: number; // 发货时限
    trademarkId: number; // 商标ID
    brandId: number; // 品牌ID
    specName: string; // 商品规格名称
  }
}

/** 查询Temu SPU分页 */
export function getProductSpuPage(params: PageParam) {
  return requestClient.get<PageResult<ProductSpuApi.ProductSpu>>('/temu/product-spu/page', { params });
}

/** 查询Temu SPU详情 */
export function getProductSpu(id: number) {
  return requestClient.get<ProductSpuApi.ProductSpu>(`/temu/product-spu/get?id=${id}`);
}

/** 新增Temu SPU */
export function createProductSpu(data: ProductSpuApi.ProductSpu) {
  return requestClient.post('/temu/product-spu/create', data);
}

/** 修改Temu SPU */
export function updateProductSpu(data: ProductSpuApi.ProductSpu) {
  return requestClient.put('/temu/product-spu/update', data);
}

/** 删除Temu SPU */
export function deleteProductSpu(id: number) {
  return requestClient.delete(`/temu/product-spu/delete?id=${id}`);
}

/** 批量删除Temu SPU */
export function deleteProductSpuList(ids: number[]) {
  return requestClient.delete(`/temu/product-spu/delete-list?ids=${ids.join(',')}`)
}

/** 导出Temu SPU */
export function exportProductSpu(params: any) {
  return requestClient.download('/temu/product-spu/export-excel', params);
}

/** 同步Temu SPU */
export function syncProductSpu() {
  return requestClient.post('/temu/product-spu/sync-all');
}
