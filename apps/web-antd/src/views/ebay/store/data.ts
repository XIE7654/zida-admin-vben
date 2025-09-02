import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { StoreApi } from '#/api/ebay/store';

// import { z } from '#/adapter/form';
import { DICT_TYPE, getDictOptions, getRangePickerDefaultProps } from '#/utils';

/** 新增/修改的表单 */
export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'id',
      component: 'Input',
      dependencies: {
        triggerFields: [''],
        show: () => false,
      },
    },
    {
      fieldName: 'shopName',
      label: '自定义店铺名称',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入自定义店铺名称',
      },
    },
    {
      fieldName: 'site',
      label: '所属站点',
      rules: 'required',
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.EBAY_STORE_SITE, 'string'),
        placeholder: '请输入所属站点',
      },
    },
    {
      fieldName: 'keepZeroStockOnline',
      label: '是否保持零库存在线（1=是，0=否）',
      rules: 'required',
      component: 'RadioGroup',
      componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
        buttonStyle: 'solid',
        optionType: 'button',
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'shopName',
      label: '自定义店铺名称',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入自定义店铺名称',
      },
    },
    {
      fieldName: 'ebayAccount',
      label: 'eBay登录账号',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入eBay登录账号',
      },
    },
    {
      fieldName: 'site',
      label: '所属站点（美国/英国/德国等）',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入所属站点（美国/英国/德国等）',
      },
    },
    {
      fieldName: 'keepZeroStockOnline',
      label: '是否保持零库存在线（1=是，0=否）',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [],
        placeholder: '请选择是否保持零库存在线（1=是，0=否）',
      },
    },
    {
      fieldName: 'authorizationType',
      label: '授权类型（API授权/手动授权等）',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [],
        placeholder: '请选择授权类型（API授权/手动授权等）',
      },
    },
    {
      fieldName: 'apiKeyExpireTime',
      label: '到期时间',
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
    {
      fieldName: 'listingQuota',
      label: '商品刊登额度上限',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入商品刊登额度上限',
      },
    },
    {
      fieldName: 'isManagedPayment',
      label: '是否启用eBay管理支付（1=启用，0=未启用）',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [],
        placeholder: '请选择是否启用eBay管理支付（1=启用，0=未启用）',
      },
    },
    {
      fieldName: 'createTime',
      label: '创建时间',
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
  ];
}

/** 列表的字段 */
export function useGridColumns(): VxeTableGridOptions<StoreApi.Store>['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: '自增主键',
      minWidth: 120,
    },
    {
      field: 'shopName',
      title: '自定义店铺名称',
      minWidth: 120,
    },
    {
      field: 'ebayAccount',
      title: 'eBay登录账号',
      minWidth: 120,
    },
    {
      field: 'site',
      title: '所属站点',
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.EBAY_STORE_SITE },
      },
    },
    {
      field: 'keepZeroStockOnline',
      title: '零库存在线',
      minWidth: 120,
    },
    {
      field: 'authorizationType',
      title: '授权类型',
      minWidth: 120,
    },
    {
      field: 'refreshTokenExpiresIn',
      title: '令牌过期时间',
      minWidth: 150,
      formatter: 'formatDateTime',
    },
    {
      field: 'listingQuota',
      title: '商品刊登额度上限',
      minWidth: 120,
    },
    {
      field: 'isManagedPayment',
      title: 'eBay管理支付',
      // title: '是否启用eBay管理支付（1=启用，0=未启用）',
      minWidth: 120,
    },
    {
      field: 'createTime',
      title: '创建时间',
      minWidth: 150,
      formatter: 'formatDateTime',
    },
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
