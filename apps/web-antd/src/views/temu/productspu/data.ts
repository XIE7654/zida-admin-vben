import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { ProductSpuApi } from '#/api/temu/productspu';

import { z } from '#/adapter/form';
import {
    getDictOptions,
    getRangePickerDefaultProps
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
      fieldName: 'goodsId',
      label: '商品唯一ID',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入商品唯一ID',
      },
    },
    {
      fieldName: 'goodsName',
      label: '商品名称',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入商品名称',
      },
    },
    {
      fieldName: 'outGoodsSn',
      label: '商家自定义商品编码',
      component: 'Input',
      componentProps: {
        placeholder: '请输入商家自定义商品编码',
      },
    },
    {
      fieldName: 'catId',
      label: '商品所属类目ID',
      component: 'Input',
      componentProps: {
        placeholder: '请输入商品所属类目ID',
      },
    },
    {
      fieldName: 'currency',
      label: '货币类型',
      component: 'Input',
      componentProps: {
        placeholder: '请输入货币类型',
      },
    },
    {
      fieldName: 'marketPrice',
      label: '市场价格',
      component: 'Input',
      componentProps: {
        placeholder: '请输入市场价格',
      },
    },
    {
      fieldName: 'price',
      label: '商品售价',
      component: 'Input',
      componentProps: {
        placeholder: '请输入商品售价',
      },
    },
    {
      fieldName: 'retailPriceAmount',
      label: '零售价金额',
      component: 'Input',
      componentProps: {
        placeholder: '请输入零售价金额',
      },
    },
    {
      fieldName: 'retailPriceCurrency',
      label: '零售价货币',
      component: 'Input',
      componentProps: {
        placeholder: '请输入零售价货币',
      },
    },
    {
      fieldName: 'listPriceAmount',
      label: '标价金额',
      component: 'Input',
      componentProps: {
        placeholder: '请输入标价金额',
      },
    },
    {
      fieldName: 'listPriceCurrency',
      label: '标价货币',
      component: 'Input',
      componentProps: {
        placeholder: '请输入标价货币',
      },
    },
    {
      fieldName: 'quantity',
      label: '商品总库存',
      component: 'Input',
      componentProps: {
        placeholder: '请输入商品总库存',
      },
    },
    {
      fieldName: 'thumbUrl',
      label: '商品缩略图URL',
      component: 'Input',
      componentProps: {
        placeholder: '请输入商品缩略图URL',
      },
    },
    {
      fieldName: 'crtTime',
      label: '商品创建时间',
      component: 'DatePicker',
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'x',
      },
    },
    {
      fieldName: 'goodsStatusChangeTime',
      label: '商品状态变更时间',
      component: 'DatePicker',
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'x',
      },
    },
    {
      fieldName: 'goodsShowSubStatus',
      label: '商品展示子状态',
      component: 'RadioGroup',
      componentProps: {
        options: [],
        buttonStyle: 'solid',
        optionType: 'button',
      },
    },
    {
      fieldName: 'status4vo',
      label: '商品状态',
      component: 'Input',
      componentProps: {
        placeholder: '请输入商品状态',
      },
    },
    {
      fieldName: 'subStatus4vo',
      label: '商品子状态',
      component: 'Input',
      componentProps: {
        placeholder: '请输入商品子状态',
      },
    },
    {
      fieldName: 'lowTrafficTag',
      label: '低流量标签',
      component: 'Input',
      componentProps: {
        placeholder: '请输入低流量标签',
      },
    },
    {
      fieldName: 'restrictedTrafficTag',
      label: '流量受限标签',
      component: 'Input',
      componentProps: {
        placeholder: '请输入流量受限标签',
      },
    },
    {
      fieldName: 'costTemplateId',
      label: '成本模板ID',
      component: 'Input',
      componentProps: {
        placeholder: '请输入成本模板ID',
      },
    },
    {
      fieldName: 'shipmentLimitSecond',
      label: '发货时限',
      component: 'Input',
      componentProps: {
        placeholder: '请输入发货时限',
      },
    },
    {
      fieldName: 'trademarkId',
      label: '商标ID',
      component: 'Input',
      componentProps: {
        placeholder: '请输入商标ID',
      },
    },
    {
      fieldName: 'brandId',
      label: '品牌ID',
      component: 'Input',
      componentProps: {
        placeholder: '请输入品牌ID',
      },
    },
    {
      fieldName: 'specName',
      label: '商品规格名称',
      component: 'Input',
      componentProps: {
        placeholder: '请输入商品规格名称',
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'goodsId',
      label: '商品唯一ID',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入商品唯一ID',
      },
    },
    {
      fieldName: 'goodsName',
      label: '商品名称',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入商品名称',
      },
    },
    {
      fieldName: 'outGoodsSn',
      label: '商家自定义商品编码',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入商家自定义商品编码',
      },
    },
    {
      fieldName: 'catId',
      label: '商品所属类目ID',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入商品所属类目ID',
      },
    },
    {
      fieldName: 'currency',
      label: '货币类型',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入货币类型',
      },
    },
    {
      fieldName: 'marketPrice',
      label: '市场价格',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入市场价格',
      },
    },
    {
      fieldName: 'price',
      label: '商品售价',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入商品售价',
      },
    },
    {
      fieldName: 'retailPriceAmount',
      label: '零售价金额',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入零售价金额',
      },
    },
    {
      fieldName: 'retailPriceCurrency',
      label: '零售价货币',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入零售价货币',
      },
    },
    {
      fieldName: 'listPriceAmount',
      label: '标价金额',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入标价金额',
      },
    },
    {
      fieldName: 'listPriceCurrency',
      label: '标价货币',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入标价货币',
      },
    },
    {
      fieldName: 'quantity',
      label: '商品总库存',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入商品总库存',
      },
    },
    {
      fieldName: 'thumbUrl',
      label: '商品缩略图URL',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入商品缩略图URL',
      },
    },
    {
      fieldName: 'crtTime',
      label: '商品创建时间',
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
    {
      fieldName: 'goodsStatusChangeTime',
      label: '商品状态变更时间',
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
    {
      fieldName: 'goodsShowSubStatus',
      label: '商品展示子状态',
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [],
        placeholder: '请选择商品展示子状态',
      },
    },
    {
      fieldName: 'status4vo',
      label: '商品状态',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入商品状态',
      },
    },
    {
      fieldName: 'subStatus4vo',
      label: '商品子状态',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入商品子状态',
      },
    },
    {
      fieldName: 'lowTrafficTag',
      label: '低流量标签',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入低流量标签',
      },
    },
    {
      fieldName: 'restrictedTrafficTag',
      label: '流量受限标签',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入流量受限标签',
      },
    },
    {
      fieldName: 'costTemplateId',
      label: '成本模板ID',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入成本模板ID',
      },
    },
    {
      fieldName: 'shipmentLimitSecond',
      label: '发货时限',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入发货时限',
      },
    },
    {
      fieldName: 'trademarkId',
      label: '商标ID',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入商标ID',
      },
    },
    {
      fieldName: 'brandId',
      label: '品牌ID',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入品牌ID',
      },
    },
    {
      fieldName: 'specName',
      label: '商品规格名称',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入商品规格名称',
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
export function useGridColumns(): VxeTableGridOptions<ProductSpuApi.ProductSpu>['columns'] {
  return [
  { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: '编号',
      minWidth: 120,
    },
    {
      field: 'goodsId',
      title: '商品唯一ID',
      minWidth: 120,
    },
    {
      field: 'goodsName',
      title: '商品名称',
      minWidth: 120,
    },
    {
      field: 'outGoodsSn',
      title: '商家自定义商品编码',
      minWidth: 120,
    },
    {
      field: 'catId',
      title: '商品所属类目ID',
      minWidth: 120,
    },
    {
      field: 'currency',
      title: '货币类型',
      minWidth: 120,
    },
    {
      field: 'marketPrice',
      title: '市场价格',
      minWidth: 120,
    },
    {
      field: 'price',
      title: '商品售价',
      minWidth: 120,
    },
    {
      field: 'retailPriceAmount',
      title: '零售价金额',
      minWidth: 120,
    },
    {
      field: 'retailPriceCurrency',
      title: '零售价货币',
      minWidth: 120,
    },
    {
      field: 'listPriceAmount',
      title: '标价金额',
      minWidth: 120,
    },
    {
      field: 'listPriceCurrency',
      title: '标价货币',
      minWidth: 120,
    },
    {
      field: 'quantity',
      title: '商品总库存',
      minWidth: 120,
    },
    {
      field: 'thumbUrl',
      title: '商品缩略图URL',
      minWidth: 120,
    },
    {
      field: 'crtTime',
      title: '商品创建时间',
      minWidth: 120,
    },
    {
      field: 'goodsStatusChangeTime',
      title: '商品状态变更时间',
      minWidth: 120,
    },
    {
      field: 'goodsShowSubStatus',
      title: '商品展示子状态',
      minWidth: 120,
    },
    {
      field: 'status4vo',
      title: '商品状态',
      minWidth: 120,
    },
    {
      field: 'subStatus4vo',
      title: '商品子状态',
      minWidth: 120,
    },
    {
      field: 'lowTrafficTag',
      title: '低流量标签',
      minWidth: 120,
    },
    {
      field: 'restrictedTrafficTag',
      title: '流量受限标签',
      minWidth: 120,
    },
    {
      field: 'costTemplateId',
      title: '成本模板ID',
      minWidth: 120,
    },
    {
      field: 'shipmentLimitSecond',
      title: '发货时限',
      minWidth: 120,
    },
    {
      field: 'trademarkId',
      title: '商标ID',
      minWidth: 120,
    },
    {
      field: 'brandId',
      title: '品牌ID',
      minWidth: 120,
    },
    {
      field: 'specName',
      title: '商品规格名称',
      minWidth: 120,
    },
    {
      field: 'createTime',
      title: '创建时间',
      minWidth: 120,
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