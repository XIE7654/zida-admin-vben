import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { StoreApi } from '#/api/temu/store';

import { z } from '#/adapter/form';
import {
  DICT_TYPE,
  getDictOptions,
  getRangePickerDefaultProps,
  TEMUSTORETYPEEnum,
} from '#/utils';

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
      fieldName: 'storeType',
      label: '店铺类型',
      component: 'RadioGroup',
      componentProps: {
        options: getDictOptions(DICT_TYPE.TEMU_STORE_TYPE, 'number'),
        placeholder: '请选择店铺类型',
      },
      rules: z.number().default(TEMUSTORETYPEEnum.FULL),
    },
    {
      fieldName: 'storeName',
      label: '自定义店铺名称',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入自定义店铺名称',
      },
    },
    {
      fieldName: 'productStockToken',
      label: '产品库存 Token',
      component: 'Input',
      componentProps: {
        placeholder: '请输入产品库存 Token',
      },
      dependencies: {
        triggerFields: ['storeType'],
        show: (values) => {
          return [TEMUSTORETYPEEnum.FULL, TEMUSTORETYPEEnum.HALF].includes(
            values.storeType,
          );
        },
      },
    },
    {
      fieldName: 'complianceApiToken',
      label: '合规 API Token',
      component: 'Input',
      componentProps: {
        placeholder: '请输入合规 API Token',
      },
      dependencies: {
        triggerFields: ['storeType'],
        show: (values) => {
          return [TEMUSTORETYPEEnum.FULL].includes(
            values.storeType,
          );
        },
      },
    },
    {
      fieldName: 'orderShippingTokenUs',
      label: '美国订单发货 Token',
      component: 'Input',
      componentProps: {
        placeholder: '请输入美国订单发货 Token',
      },
      dependencies: {
        triggerFields: ['storeType'],
        show: (values) => {
          return [TEMUSTORETYPEEnum.HALF].includes(
            values.storeType,
          );
        },
      },
    },
    {
      fieldName: 'orderShippingTokenEu',
      label: '欧区订单发货 Token',
      component: 'Input',
      componentProps: {
        placeholder: '请输入欧区订单发货 Token',
      },
      dependencies: {
        triggerFields: ['storeType'],
        show: (values) => {
          return [TEMUSTORETYPEEnum.HALF].includes(
            values.storeType,
          );
        },
      },
    },
    {
      fieldName: 'orderShippingTokenGlobal',
      label: '全球订单发货 Token',
      component: 'Input',
      componentProps: {
        placeholder: '请输入全球订单发货 Token',
      },
      dependencies: {
        triggerFields: ['storeType'],
        show: (values) => {
          return [TEMUSTORETYPEEnum.HALF].includes(
            values.storeType,
          );
        },
      },
    },
    {
      fieldName: 'accessToken',
      label: '授权 Token',
      component: 'Input',
      componentProps: {
        placeholder: '授权 Token',
      },
      dependencies: {
        triggerFields: ['storeType'],
        show: (values) => {
          return [TEMUSTORETYPEEnum.LOCAL].includes(
            values.storeType,
          );
        },
      },
    },
    {
      fieldName: 'storeCurrency',
      label: '店铺币种',
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.TEMU_STORE_CURRENCY, 'string'),
        placeholder: '请输入店铺币种',
      },
      dependencies: {
        triggerFields: ['storeType'],
        show: (values) => {
          return [TEMUSTORETYPEEnum.FULL, TEMUSTORETYPEEnum.HALF].includes(
            values.storeType,
          );
        },
      },
    },
    {
      fieldName: 'storeSite',
      label: '店铺站点',
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.TEMU_STORE_SITE, 'string'),
        placeholder: '请输入店铺站点）',
      },
      dependencies: {
        triggerFields: ['storeType'],
        show: (values) => {
          return [TEMUSTORETYPEEnum.LOCAL].includes(
            values.storeType,
          );
        },
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'storeType',
      label: '店铺类型',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [],
        placeholder: '请选择店铺类型',
      },
    },
    {
      fieldName: 'StoreName',
      label: '自定义店铺名称',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入自定义店铺名称',
      },
    },
    {
      fieldName: 'productStockToken',
      label: '产品库存 Token',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入产品库存 Token',
      },
    },
    {
      fieldName: 'complianceApiToken',
      label: '合规 API Token',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入合规 API Token',
      },
    },
    {
      fieldName: 'orderShippingTokenUs',
      label: '美国订单发货 Token',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入美国订单发货 Token',
      },
    },
    {
      fieldName: 'orderShippingTokenEu',
      label: '欧区订单发货 Token',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入欧区订单发货 Token',
      },
    },
    {
      fieldName: 'orderShippingTokenGlobal',
      label: '全球订单发货 Token',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入全球订单发货 Token',
      },
    },
    {
      fieldName: 'storeCurrency',
      label: '店铺币种，如 CNY、USD(香港主体店铺) 等',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入店铺币种，如 CNY、USD(香港主体店铺) 等',
      },
    },
    {
      fieldName: 'storeSite',
      label: '店铺站点（本土店铺用，如美国、法国等）',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入店铺站点（本土店铺用，如美国、法国等）',
      },
    },
    {
      fieldName: 'authStatus',
      label: '授权状态：0-未授权，1-已授权，2-已过期，3-已取消',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [],
        placeholder: '请选择授权状态：0-未授权，1-已授权，2-已过期，3-已取消',
      },
    },
    {
      fieldName: 'authTime',
      label: '授权时间',
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
    {
      fieldName: 'apiScopeList',
      label: 'API权限列表，JSON格式存储',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入API权限列表，JSON格式存储',
      },
    },
    {
      fieldName: 'appSubscribeEventCodeList',
      label: '应用订阅事件列表，JSON格式存储',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入应用订阅事件列表，JSON格式存储',
      },
    },
    {
      fieldName: 'appSubscribeStatus',
      label: '应用订阅状态：0-未订阅，1-已订阅',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [],
        placeholder: '请选择应用订阅状态：0-未订阅，1-已订阅',
      },
    },
    {
      fieldName: 'authEventCodeList',
      label: '授权事件代码列表，JSON格式存储',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入授权事件代码列表，JSON格式存储',
      },
    },
    {
      fieldName: 'expiredTime',
      label: '过期时间戳，如：1765634102',
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
    {
      fieldName: 'mallId',
      label: '商城ID，如：1024',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入商城ID，如：1024',
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
      field: 'storeType',
      title: '店铺类型',
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.TEMU_STORE_TYPE },
      },
    },
    {
      field: 'storeName',
      title: '自定义店铺名称',
      minWidth: 120,
    },
    {
      field: 'storeCurrency',
      title: '店铺币种',
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.TEMU_STORE_CURRENCY },
      },
    },
    {
      field: 'storeSite',
      title: '店铺站点',
      minWidth: 120,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.TEMU_STORE_SITE },
      },
    },
    {
      field: 'authStatus',
      // title: '授权状态：0-未授权，1-已授权，2-已过期，3-已取消',
      title: '授权状态',
      minWidth: 120,
    },
    {
      field: 'authTime',
      title: '授权时间',
      minWidth: 150,
      formatter: 'formatDateTime',
    },
    // {
    //   field: 'apiScopeList',
    //   title: 'API权限列表，JSON格式存储',
    //   minWidth: 120,
    // },
    // {
    //   field: 'appSubscribeEventCodeList',
    //   title: '应用订阅事件列表，JSON格式存储',
    //   minWidth: 120,
    // },
    // {
    //   field: 'appSubscribeStatus',
    //   title: '应用订阅状态：0-未订阅，1-已订阅',
    //   minWidth: 120,
    // },
    // {
    //   field: 'authEventCodeList',
    //   title: '授权事件代码列表，JSON格式存储',
    //   minWidth: 120,
    // },
    {
      field: 'expiredTime',
      title: '过期时间戳',
      minWidth: 120,
    },
    // {
    //   field: 'mallId',
    //   title: '商城ID，如：1024',
    //   minWidth: 120,
    // },
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
