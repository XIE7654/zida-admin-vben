<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { StoreApi } from '#/api/temu/store';

import { Page, useVbenModal } from '@vben/common-ui';
import { message,Tabs } from 'ant-design-vue';
import Form from './modules/form.vue';


import { ref, computed } from 'vue';
import { $t } from '#/locales';
import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import { getStorePage, deleteStore, deleteStoreList, exportStore } from '#/api/temu/store';
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

/** 创建Temu 店铺授权信息 */
function handleCreate() {
  formModalApi.setData({}).open();
}

/** 编辑Temu 店铺授权信息 */
function handleEdit(row: StoreApi.Store) {
  formModalApi.setData(row).open();
}


/** 删除Temu 店铺授权信息 */
async function handleDelete(row: StoreApi.Store) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.id]),
    key: 'action_key_msg'
  });
  try {
    await deleteStore(row.id as number);
    message.success({
      content: $t('ui.actionMessage.deleteSuccess', [row.id]),
      key: 'action_key_msg',
    });
    onRefresh();
  } finally {
    hideLoading();
  }
}


/** 授权Temu 店铺 */
async function handleAuthorize(row: ShopApi.Shop) {
  // 这里添加授权逻辑
  message.info(`开始授权店铺: ${row.id}`);
  const data = await authorizeShop(row);
  if (data.success) {
    message.success({
      content: $t('ui.actionMessage.operationSuccess', [row.id]),
      key: 'action_key_msg',
    });
    onRefresh();
  }
}

/** 批量删除Temu 店铺授权信息 */
async function handleDeleteBatch() {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting'),
    key: 'action_key_msg'
  });
  try {
    await deleteStoreList(checkedIds.value);
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
  records: StoreApi.Store[];
}) {
  checkedIds.value = records.map((item) => item.id);
}

/** 导出表格 */
async function handleExport() {
  const data = await exportStore(await gridApi.formApi.getValues());
  downloadFileFromBlobPart({ fileName: 'Temu 店铺授权信息.xls', source: data });
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
          return await getStorePage({
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
  } as VxeTableGridOptions<StoreApi.Store>,
  gridEvents:{
      checkboxAll: handleRowCheckboxChange,
      checkboxChange: handleRowCheckboxChange
  }
});
</script>

<template>
  <Page auto-content-height>
    <FormModal @success="onRefresh" />

    <Grid table-title="Temu 店铺授权信息列表">
      <template #toolbar-tools>
        <TableAction
          :actions="[
            {
              label: $t('ui.actionTitle.create', ['Temu 店铺授权信息']),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              auth: ['temu:store:create'],
              onClick: handleCreate,
            },
            {
              label: $t('ui.actionTitle.deleteBatch'),
              type: 'primary',
              danger: true,
              icon: ACTION_ICON.DELETE,
              disabled: isEmpty(checkedIds),
              auth: ['temu:store:delete'],
              onClick: handleDeleteBatch,
            },
          ]"
        />
      </template>
      <template #actions="{ row }">
        <TableAction
          :actions="[
              {
              label: '授权',
              type: 'link',
              icon: ACTION_ICON.EDIT,
              auth: ['temu:shop:update'],
              onClick: handleAuthorize.bind(null, row),
            },
            {
              label: $t('common.edit'),
              type: 'link',
              icon: ACTION_ICON.EDIT,
              auth: ['temu:store:update'],
              onClick: handleEdit.bind(null, row),
            },
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['temu:store:delete'],
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
