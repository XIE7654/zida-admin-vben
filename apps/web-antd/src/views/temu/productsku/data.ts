import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { ProductSkuApi } from '#/api/temu/productsku';

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
      fieldName: 'skuId',
      label: 'SKU唯一ID',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入SKU唯一ID',
      },
    },
    {
      fieldName: 'goodsId',
      label: '所属商品ID',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入所属商品ID',
      },
    },
    {
      fieldName: 'goodsName',
      label: '所属商品名称',
      rules: 'required',
      component: 'Input',
      componentProps: {
        placeholder: '请输入所属商品名称',
      },
    },
    {
      fieldName: 'skuSn',
      label: '平台SKU编码',
      component: 'Input',
      componentProps: {
        placeholder: '请输入平台SKU编码',
      },
    },
    {
      fieldName: 'specName',
      label: 'SKU规格名称',
      component: 'Input',
      componentProps: {
        placeholder: '请输入SKU规格名称',
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
      fieldName: 'price',
      label: 'SKU售价',
      component: 'Input',
      componentProps: {
        placeholder: '请输入SKU售价',
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
      fieldName: 'stock',
      label: 'SKU单独库存',
      component: 'Input',
      componentProps: {
        placeholder: '请输入SKU单独库存',
      },
    },
    {
      fieldName: 'thumbUrl',
      label: 'SKU缩略图URL',
      component: 'Input',
      componentProps: {
        placeholder: '请输入SKU缩略图URL',
      },
    },
    {
      fieldName: 'crtTime',
      label: 'SKU创建时间',
      component: 'DatePicker',
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'x',
      },
    },
    {
      fieldName: 'skuStatusChangeTime',
      label: 'SKU状态变更时间',
      component: 'DatePicker',
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'x',
      },
    },
    {
      fieldName: 'status4vo',
      label: 'SKU状态',
      component: 'Input',
      componentProps: {
        placeholder: '请输入SKU状态',
      },
    },
    {
      fieldName: 'subStatus4vo',
      label: 'SKU子状态',
      component: 'Input',
      componentProps: {
        placeholder: '请输入SKU子状态',
      },
    },
    {
      fieldName: 'skuShowSubStatus4vo',
      label: 'SKU展示子状态',
      component: 'Input',
      componentProps: {
        placeholder: '请输入SKU展示子状态',
      },
    },
    {
      fieldName: 'goodsIsOnSale',
      label: '所属商品是否在售',
      component: 'Input',
      componentProps: {
        placeholder: '请输入所属商品是否在售',
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
      fieldName: 'weight',
      label: 'SKU重量',
      component: 'Input',
      componentProps: {
        placeholder: '请输入SKU重量',
      },
    },
    {
      fieldName: 'weightUnit',
      label: '重量单位',
      component: 'Input',
      componentProps: {
        placeholder: '请输入重量单位',
      },
    },
    {
      fieldName: 'length',
      label: 'SKU长度',
      component: 'Input',
      componentProps: {
        placeholder: '请输入SKU长度',
      },
    },
    {
      fieldName: 'width',
      label: 'SKU宽度',
      component: 'Input',
      componentProps: {
        placeholder: '请输入SKU宽度',
      },
    },
    {
      fieldName: 'height',
      label: 'SKU高度',
      component: 'Input',
      componentProps: {
        placeholder: '请输入SKU高度',
      },
    },
    {
      fieldName: 'volumeUnit',
      label: '体积单位',
      component: 'Input',
      componentProps: {
        placeholder: '请输入体积单位',
      },
    },
  ];
}

/** 列表的搜索表单 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'skuId',
      label: 'SKU唯一ID',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入SKU唯一ID',
      },
    },
    {
      fieldName: 'goodsId',
      label: '所属商品ID',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入所属商品ID',
      },
    },
    {
      fieldName: 'goodsName',
      label: '所属商品名称',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入所属商品名称',
      },
    },
    {
      fieldName: 'skuSn',
      label: '平台SKU编码',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入平台SKU编码',
      },
    },
    {
      fieldName: 'specName',
      label: 'SKU规格名称',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入SKU规格名称',
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
      fieldName: 'price',
      label: 'SKU售价',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入SKU售价',
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
      fieldName: 'stock',
      label: 'SKU单独库存',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入SKU单独库存',
      },
    },
    {
      fieldName: 'thumbUrl',
      label: 'SKU缩略图URL',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入SKU缩略图URL',
      },
    },
    {
      fieldName: 'crtTime',
      label: 'SKU创建时间',
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
    {
      fieldName: 'skuStatusChangeTime',
      label: 'SKU状态变更时间',
      component: 'RangePicker',
      componentProps: {
        ...getRangePickerDefaultProps(),
        allowClear: true,
      },
    },
    {
      fieldName: 'status4vo',
      label: 'SKU状态',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入SKU状态',
      },
    },
    {
      fieldName: 'subStatus4vo',
      label: 'SKU子状态',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入SKU子状态',
      },
    },
    {
      fieldName: 'skuShowSubStatus4vo',
      label: 'SKU展示子状态',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入SKU展示子状态',
      },
    },
    {
      fieldName: 'goodsIsOnSale',
      label: '所属商品是否在售',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入所属商品是否在售',
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
      fieldName: 'weight',
      label: 'SKU重量',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入SKU重量',
      },
    },
    {
      fieldName: 'weightUnit',
      label: '重量单位',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入重量单位',
      },
    },
    {
      fieldName: 'length',
      label: 'SKU长度',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入SKU长度',
      },
    },
    {
      fieldName: 'width',
      label: 'SKU宽度',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入SKU宽度',
      },
    },
    {
      fieldName: 'height',
      label: 'SKU高度',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入SKU高度',
      },
    },
    {
      fieldName: 'volumeUnit',
      label: '体积单位',
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入体积单位',
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
export function useGridColumns(): VxeTableGridOptions<ProductSkuApi.ProductSku>['columns'] {
  return [
  { type: 'checkbox', width: 40 },
    {
      field: 'id',
      title: '编号',
      minWidth: 120,
    },
    {
      field: 'skuId',
      title: 'SKU唯一ID',
      minWidth: 120,
    },
    {
      field: 'goodsId',
      title: '所属商品ID',
      minWidth: 120,
    },
    {
      field: 'goodsName',
      title: '所属商品名称',
      minWidth: 120,
    },
    {
      field: 'skuSn',
      title: '平台SKU编码',
      minWidth: 120,
    },
    {
      field: 'specName',
      title: 'SKU规格名称',
      minWidth: 120,
    },
    {
      field: 'currency',
      title: '货币类型',
      minWidth: 120,
    },
    {
      field: 'price',
      title: 'SKU售价',
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
      field: 'stock',
      title: 'SKU单独库存',
      minWidth: 120,
    },
    {
      field: 'thumbUrl',
      title: 'SKU缩略图URL',
      minWidth: 120,
    },
    {
      field: 'crtTime',
      title: 'SKU创建时间',
      minWidth: 120,
    },
    {
      field: 'skuStatusChangeTime',
      title: 'SKU状态变更时间',
      minWidth: 120,
    },
    {
      field: 'status4vo',
      title: 'SKU状态',
      minWidth: 120,
    },
    {
      field: 'subStatus4vo',
      title: 'SKU子状态',
      minWidth: 120,
    },
    {
      field: 'skuShowSubStatus4vo',
      title: 'SKU展示子状态',
      minWidth: 120,
    },
    {
      field: 'goodsIsOnSale',
      title: '所属商品是否在售',
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
      field: 'weight',
      title: 'SKU重量',
      minWidth: 120,
    },
    {
      field: 'weightUnit',
      title: '重量单位',
      minWidth: 120,
    },
    {
      field: 'length',
      title: 'SKU长度',
      minWidth: 120,
    },
    {
      field: 'width',
      title: 'SKU宽度',
      minWidth: 120,
    },
    {
      field: 'height',
      title: 'SKU高度',
      minWidth: 120,
    },
    {
      field: 'volumeUnit',
      title: '体积单位',
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