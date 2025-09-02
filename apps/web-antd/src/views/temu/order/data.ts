import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OrderApi } from '#/api/temu/order';

import { formatDateTime } from '#/utils/formatter';

// import { z } from '#/adapter/form';
// import {
//     getDictOptions,
//     getRangePickerDefaultProps
// } from '#/utils';

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
      fieldName: 'parentOrderSn',
      label: '订单号',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入订单号',
      },
    },
    {
      fieldName: 'parentOrderStatus',
      label: '订单状态',
      rules: 'required',
      component: 'RadioGroup',
      componentProps: {
        options: [],
        buttonStyle: 'solid',
        optionType: 'button',
      },
    },
    {
      fieldName: 'parentOrderTime',
      label: '创建时间',
      rules: 'required',
      component: 'DatePicker',
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'x',
      },
    },
    {
      fieldName: 'expectShipLatestTime',
      label: '最晚发货时间',
      component: 'DatePicker',
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'x',
      },
    },
    {
      fieldName: 'parentOrderPendingFinishTime',
      label: '待处理状态结束时间',
      component: 'DatePicker',
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'x',
      },
    },
    {
      fieldName: 'latestDeliveryTime',
      label: '最晚送达时间',
      component: 'DatePicker',
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'x',
      },
    },
    {
      fieldName: 'parentShippingTime',
      label: '订单发货时间',
      component: 'DatePicker',
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'x',
      },
    },
    {
      fieldName: 'siteId',
      label: '站点ID',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入站点ID',
      },
    },
    {
      fieldName: 'regionId',
      label: '地区ID',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入地区ID',
      },
    },
    {
      fieldName: 'parentOrderLabel',
      label: '订单状态标签',
      component: 'Input',
      componentProps: {
        placeholder: '请输入订单状态标签',
      },
    },
    {
      fieldName: 'fulfillmentWarning',
      label: '履约提示列表',
      component: 'Input',
      componentProps: {
        placeholder: '请输入履约提示列表',
      },
    },
    {
      fieldName: 'hasShippingFee',
      label: '用户实际支付运费是否为0',
      component: 'RadioGroup',
      componentProps: {
        options: [],
        buttonStyle: 'solid',
        optionType: 'button',
      },
    },
    {
      fieldName: 'shippingMethod',
      label: '配送渠道类型',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入配送渠道类型',
      },
    },
    {
      fieldName: 'orderPaymentType',
      label: '订单支付类型',
      component: 'Select',
      componentProps: {
        options: [],
        placeholder: '请选择订单支付类型',
      },
    },
    {
      fieldName: 'batchOrderNumberList',
      label: '批次订单号列表',
      component: 'Input',
      componentProps: {
        placeholder: '请输入批次订单号列表',
      },
    },
    {
      fieldName: 'orderList',
      label: '子订单信息列表',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入子订单信息列表',
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'parentOrderSn',
      label: '订单号',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入订单号',
      },
    },
    // {
    //   fieldName: 'parentOrderStatus',
    //   label: '订单状态',
    //   component: 'Select',
    //   componentProps: {
    //     allowClear: true,
    //     options: [],
    //     placeholder: '请选择订单状态',
    //   },
    // },
    // {
    //   fieldName: 'parentOrderTime',
    //   label: '创建时间',
    //   component: 'RangePicker',
    //   componentProps: {
    //     ...getRangePickerDefaultProps(),
    //     allowClear: true,
    //   },
    // },
    // {
    //   fieldName: 'expectShipLatestTime',
    //   label: '最晚发货时间',
    //   component: 'RangePicker',
    //   componentProps: {
    //     ...getRangePickerDefaultProps(),
    //     allowClear: true,
    //   },
    // },
    // {
    //   fieldName: 'parentOrderPendingFinishTime',
    //   label: '待处理状态结束时间',
    //   component: 'RangePicker',
    //   componentProps: {
    //     ...getRangePickerDefaultProps(),
    //     allowClear: true,
    //   },
    // },
    // {
    //   fieldName: 'latestDeliveryTime',
    //   label: '最晚送达时间',
    //   component: 'RangePicker',
    //   componentProps: {
    //     ...getRangePickerDefaultProps(),
    //     allowClear: true,
    //   },
    // },
    // {
    //   fieldName: 'parentShippingTime',
    //   label: '订单发货时间',
    //   component: 'RangePicker',
    //   componentProps: {
    //     ...getRangePickerDefaultProps(),
    //     allowClear: true,
    //   },
    // },
    // {
    //   fieldName: 'siteId',
    //   label: '站点ID',
    //   component: 'Input',
    //   componentProps: {
    //     allowClear: true,
    //     placeholder: '请输入站点ID',
    //   },
    // },
    // {
    //   fieldName: 'regionId',
    //   label: '地区ID',
    //   component: 'Input',
    //   componentProps: {
    //     allowClear: true,
    //     placeholder: '请输入地区ID',
    //   },
    // },
    // {
    //   fieldName: 'parentOrderLabel',
    //   label: '订单状态标签',
    //   component: 'Input',
    //   componentProps: {
    //     allowClear: true,
    //     placeholder: '请输入订单状态标签',
    //   },
    // },
    // {
    //   fieldName: 'fulfillmentWarning',
    //   label: '履约提示列表',
    //   component: 'Input',
    //   componentProps: {
    //     allowClear: true,
    //     placeholder: '请输入履约提示列表',
    //   },
    // },
    // {
    //   fieldName: 'hasShippingFee',
    //   label: '用户实际支付运费是否为0',
    //   component: 'Select',
    //   componentProps: {
    //     allowClear: true,
    //     options: [],
    //     placeholder: '请选择用户实际支付运费是否为0',
    //   },
    // },
    // {
    //   fieldName: 'shippingMethod',
    //   label: '配送渠道类型',
    //   component: 'Input',
    //   componentProps: {
    //     allowClear: true,
    //     placeholder: '请输入配送渠道类型',
    //   },
    // },
    // {
    //   fieldName: 'orderPaymentType',
    //   label: '订单支付类型',
    //   component: 'Select',
    //   componentProps: {
    //     allowClear: true,
    //     options: [],
    //     placeholder: '请选择订单支付类型',
    //   },
    // },
    // {
    //   fieldName: 'batchOrderNumberList',
    //   label: '批次订单号列表',
    //   component: 'Input',
    //   componentProps: {
    //     allowClear: true,
    //     placeholder: '请输入批次订单号列表',
    //   },
    // },
    // {
    //   fieldName: 'orderList',
    //   label: '子订单信息列表',
    //   component: 'Input',
    //   componentProps: {
    //     allowClear: true,
    //     placeholder: '请输入子订单信息列表',
    //   },
    // },
  ];
}

/** 列表的字段 */
export function useGridColumns(): VxeTableGridOptions<OrderApi.Order>['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: '主键自增ID',
      minWidth: 50,
    },
    {
      field: 'parentOrderSn',
      title: '订单号',
      minWidth: 220,
    },
    {
      field: 'parentOrderStatus',
      title: '订单状态',
      minWidth: 120,
    },
    {
      field: 'parentOrderTime',
      title: '创建时间',
      minWidth: 150,
      formatter: formatDateTime,
    },
    {
      field: 'expectShipLatestTime',
      title: '最晚发货时间',
      minWidth: 150,
      formatter: formatDateTime,
    },
    {
      field: 'parentOrderPendingFinishTime',
      title: '待处理状态结束时间',
      minWidth: 150,
      formatter: formatDateTime,
    },
    {
      field: 'latestDeliveryTime',
      title: '最晚送达时间',
      minWidth: 150,
      formatter: formatDateTime,
    },
    {
      field: 'parentShippingTime',
      title: '订单发货时间',
      minWidth: 120,
    },
    {
      field: 'siteId',
      title: '站点ID',
      minWidth: 120,
    },
    {
      field: 'regionId',
      title: '地区ID',
      minWidth: 120,
    },
    {
      field: 'parentOrderLabel',
      title: '订单状态标签',
      minWidth: 120,
    },
    {
      field: 'fulfillmentWarning',
      title: '履约提示列表',
      minWidth: 120,
    },
    {
      field: 'hasShippingFee',
      title: '用户实际支付运费是否为0',
      minWidth: 120,
    },
    {
      field: 'shippingMethod',
      title: '配送渠道类型',
      minWidth: 120,
    },
    {
      field: 'orderPaymentType',
      title: '订单支付类型',
      minWidth: 120,
    },
    {
      field: 'batchOrderNumberList',
      title: '批次订单号列表',
      minWidth: 120,
    },
    {
      field: 'orderList',
      title: '子订单信息列表',
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
      width: 300,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}
