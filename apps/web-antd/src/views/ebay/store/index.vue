<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import { AuthorizeStore, refreshOAuthToken, type StoreApi } from "#/api/ebay/store";

import { Page, useVbenModal } from '@vben/common-ui';
import { message,Tabs } from 'ant-design-vue';
import Form from './modules/form.vue';


import { ref, computed } from 'vue';
import { $t } from '#/locales';
import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import { getStorePage, deleteStore, deleteStoreList, exportStore } from '#/api/ebay/store';
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

/** 创建eBay店铺 */
function handleCreate() {
  formModalApi.setData({}).open();
}

/** 编辑eBay店铺 */
function handleEdit(row: StoreApi.Store) {
  formModalApi.setData(row).open();
}


/** 授权eBay店铺 */
async function handleAuthorize(row: StoreApi.Store) {
  const data = await AuthorizeStore(row);
  console.log(data);
  openNewWindow(data);
};

/** 刷新eBay店铺token */
async function handleRefresh(row: StoreApi.Store) {
  const data = await refreshOAuthToken({ storeId: row.id });
  message.success('刷新token成功');
};

const openNewWindow = (url: string) => {
  // 获取屏幕的宽高
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  // 计算70%的宽高
  const width = Math.floor(screenWidth * 0.7);
  const height = Math.floor(screenHeight * 0.7);

  // 计算窗口居中的位置
  const left = Math.floor((screenWidth - width) / 2);
  const top = Math.floor((screenHeight - height) / 2);

  // 打开新窗口，设置尺寸和位置
  window.open(
    url, // 替换为你的目标URL
    '_blank',
    `width=${width}, height=${height}, left=${left}, top=${top}`,
  );
};


/** 删除eBay店铺 */
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

/** 批量删除eBay店铺 */
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
  downloadFileFromBlobPart({ fileName: 'eBay店铺.xls', source: data });
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

    <Grid table-title="eBay店铺列表">
      <template #toolbar-tools>
        <TableAction
          :actions="[
            {
              label: $t('ui.actionTitle.create', ['eBay店铺']),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              auth: ['ebay:store:create'],
              onClick: handleCreate,
            },
            {
              label: $t('ui.actionTitle.export'),
              type: 'primary',
              icon: ACTION_ICON.DOWNLOAD,
              auth: ['ebay:store:export'],
              onClick: handleExport,
            },
            {
              label: $t('ui.actionTitle.deleteBatch'),
              type: 'primary',
              danger: true,
              icon: ACTION_ICON.DELETE,
              disabled: isEmpty(checkedIds),
              auth: ['ebay:store:delete'],
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
              icon: ACTION_ICON.MORE,
              auth: ['ebay:store:update'],
              onClick: handleAuthorize.bind(null, row),
            },
            {
              label: '刷新token',
              type: 'link',
              icon: ACTION_ICON.FILTER,
              auth: ['ebay:store:update'],
              onClick: handleRefresh.bind(null, row),
            },
            {
              label: $t('common.edit'),
              type: 'link',
              icon: ACTION_ICON.EDIT,
              auth: ['ebay:store:update'],
              onClick: handleEdit.bind(null, row),
            },
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['ebay:store:delete'],
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
