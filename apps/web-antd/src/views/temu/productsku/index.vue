<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { ProductSkuApi } from '#/api/temu/productsku';

import { Page, useVbenModal } from '@vben/common-ui';
import { message,Tabs } from 'ant-design-vue';
import Form from './modules/form.vue';


import { ref, computed } from 'vue';
import { $t } from '#/locales';
import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  getProductSkuPage,
  deleteProductSku,
  syncProductSku,
  deleteProductSkuList,
  exportProductSku,
} from '#/api/temu/productsku';
import { downloadFileFromBlobPart, isEmpty } from '@vben/utils';

import { useGridColumns, useGridFormSchema } from './data';


const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true
});


/** 刷新表格 */
function onRefresh() {
  gridApi.query();
}

/** 创建Temu SKU明细 */
function handleCreate() {
  formModalApi.setData({}).open();
}

/** 编辑Temu SKU明细 */
function handleEdit(row: ProductSkuApi.ProductSku) {
  formModalApi.setData(row).open();
}


/** 删除Temu SKU明细 */
async function handleDelete(row: ProductSkuApi.ProductSku) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.id]),
    key: 'action_key_msg'
  });
  try {
    await deleteProductSku(row.id as number);
    message.success({
      content: $t('ui.actionMessage.deleteSuccess', [row.id]),
      key: 'action_key_msg',
    });
    onRefresh();
  } finally {
    hideLoading();
  }
}

/** 批量删除Temu SKU明细 */
async function handleDeleteBatch() {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting'),
    key: 'action_key_msg'
  });
  try {
    await deleteProductSkuList(checkedIds.value);
    checkedIds.value = [];
    message.success({
      content: $t('ui.actionMessage.deleteSuccess'),
      key: 'action_key_msg',
    });
    onRefresh();
  } finally {
    hideLoading();
  }
}

const checkedIds = ref<number[]>([])
function handleRowCheckboxChange({
  records
}: {
  records: ProductSkuApi.ProductSku[];
}) {
  checkedIds.value = records.map((item) => item.id);
}

/** 导出表格 */
async function handleExport() {
  const data = await exportProductSku(await gridApi.formApi.getValues());
  downloadFileFromBlobPart({ fileName: 'Temu SKU明细.xls', source: data });
}


/** 同步Temu SkU */
async function handleSync() {
  const hideLoading = message.loading({
    content: '正在同步',
    key: 'action_key_msg'
  });
  try {
    // 这里需要替换为实际的同步API调用
    await syncProductSku();
    message.success({
      content: '同步成功',
      key: 'action_key_msg',
    });
    onRefresh();
  } catch (error) {
    message.error({
      content: '同步失败',
      key: 'action_key_msg',
    });
  } finally {
    hideLoading();
  }
}

const [Grid, gridApi] = useVbenVxeGrid({
  // formOptions: {
  //   schema: useGridFormSchema()
  // },
  gridOptions: {
    columns: useGridColumns(),
    height: 'auto',
    pagerConfig: {
      enabled: true,
    },
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getProductSkuPage({
            pageNo: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    rowConfig: {
      keyField: 'id',
      isHover: true,
    },
    toolbarConfig: {
      refresh: true,
      search: true,
    }
  } as VxeTableGridOptions<ProductSkuApi.ProductSku>,
  gridEvents:{
      checkboxAll: handleRowCheckboxChange,
      checkboxChange: handleRowCheckboxChange
  }
});
</script>

<template>
  <Page auto-content-height>
    <FormModal @success="onRefresh" />

    <Grid table-title="Temu SKU明细列表">
      <template #toolbar-tools>
        <TableAction
          :actions="[
            {
              label: $t('ui.actionTitle.create', ['Temu SKU明细']),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              auth: ['temu:product-sku:create'],
              onClick: handleCreate,
            },
            {
              label: '同步', // 同步按钮
              type: 'primary',
              icon: ACTION_ICON.REFRESH,
              auth: ['temu:product-sku:create'],
              onClick: handleSync,
            },
            {
              label: $t('ui.actionTitle.export'),
              type: 'primary',
              icon: ACTION_ICON.DOWNLOAD,
              auth: ['temu:product-sku:export'],
              onClick: handleExport,
            },
            {
              label: $t('ui.actionTitle.deleteBatch'),
              type: 'primary',
              danger: true,
              icon: ACTION_ICON.DELETE,
              disabled: isEmpty(checkedIds),
              auth: ['temu:product-sku:delete'],
              onClick: handleDeleteBatch,
            },
          ]"
        />
      </template>
      <template #actions="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('common.edit'),
              type: 'link',
              icon: ACTION_ICON.EDIT,
              auth: ['temu:product-sku:update'],
              onClick: handleEdit.bind(null, row),
            },
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['temu:product-sku:delete'],
              popConfirm: {
                title: $t('ui.actionMessage.deleteConfirm', [row.id]),
                confirm: handleDelete.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>

  </Page>
</template>
