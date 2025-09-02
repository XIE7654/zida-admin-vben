<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OrderApi } from '#/api/temu/order';

import { h, ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';
import { downloadFileFromBlobPart } from '@vben/utils';

import { message, Modal } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deleteOrder,
  deleteOrderList,
  exportOrder,
  getOrderPage,
  syncAllOrders,
  syncOrderAddress,
  syncOrderDetail,
} from '#/api/temu/order';
import { $t } from '#/locales';

import { useGridColumns, useGridFormSchema } from './data';
import Form from './modules/form.vue';

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

/** 刷新表格 */
function onRefresh() {
  gridApi.query();
}

/** 创建Temu订单 */
function handleCreate() {
  formModalApi.setData({}).open();
}

/** 同步Temu订单 */
async function handleSyncOrder() {
  const hideLoading = message.loading({
    content: '正在同步订单',
    key: 'action_key_msg',
  });
  try {
    // 调用同步订单API
    await syncAllOrders();
    message.success({
      content: '订单同步成功',
      key: 'action_key_msg',
    });
    onRefresh();
  } catch {
    message.error({
      content: '订单同步失败',
      key: 'action_key_msg',
    });
  } finally {
    hideLoading();
  }
}

/** 编辑Temu订单 */
function handleEdit(row: OrderApi.Order) {
  formModalApi.setData(row).open();
}

/** 删除Temu订单 */
async function handleDelete(row: OrderApi.Order) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.id]),
    key: 'action_key_msg',
  });
  try {
    await deleteOrder(row.id as number);
    message.success({
      content: $t('ui.actionMessage.deleteSuccess', [row.id]),
      key: 'action_key_msg',
    });
    onRefresh();
  } finally {
    hideLoading();
  }
}

/** 批量删除Temu订单 */
async function handleDeleteBatch() {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting'),
    key: 'action_key_msg',
  });
  try {
    await deleteOrderList(checkedIds.value);
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

const checkedIds = ref<number[]>([]);
function handleRowCheckboxChange({ records }: { records: OrderApi.Order[] }) {
  checkedIds.value = records.map((item) => item.id);
}

/** 导出表格 */
async function handleExport() {
  const data = await exportOrder(await gridApi.formApi.getValues());
  downloadFileFromBlobPart({ fileName: 'Temu订单.xls', source: data });
}
/** 同步Temu订单详情 */
async function handleSyncDetail(row: OrderApi.Order) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.updating', [row.parentOrderSn]),
    key: 'action_key_msg',
  });
  try {
    // 调用同步详情API（需要你实现具体的API调用）
    const data = await syncOrderDetail(row.id);
    message.success({
      content: $t('ui.actionMessage.updateSuccess', [row.parentOrderSn]),
      key: 'action_key_msg',
    });
    const formattedData = JSON.stringify(data.result, null, 2);
    Modal.success({
      title: 'JSON 解析结果',
      content: h(
        'pre',
        {
          style: {
            maxHeight: '400px',
            overflow: 'auto',
          },
        },
        formattedData,
      ),
      width: 600,
    });
    onRefresh();
  } catch {
    message.error({
      content: $t('ui.actionMessage.updateFailed', [row.parentOrderSn]),
      key: 'action_key_msg',
    });
  } finally {
    hideLoading();
  }
}

/** 同步Temu订单地址 */
async function handleSyncAddress(row: OrderApi.Order) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.updating', [row.parentOrderSn]),
    key: 'action_key_msg',
  });
  try {
    // 调用同步地址API（需要你实现具体的API调用）
    const data = await syncOrderAddress(row.id);
    message.success({
      content: $t('ui.actionMessage.updateSuccess', [row.parentOrderSn]),
      key: 'action_key_msg',
    });
    const formattedData = JSON.stringify(data.result, null, 2);
    Modal.success({
      title: 'JSON 解析结果',
      content: h(
        'pre',
        {
          style: {
            maxHeight: '400px',
            overflow: 'auto',
          },
        },
        formattedData,
      ),
      width: 600,
    });
    onRefresh();
  } catch {
    message.error({
      content: $t('ui.actionMessage.updateFailed', [row.parentOrderSn]),
      key: 'action_key_msg',
    });
  } finally {
    hideLoading();
  }
}
const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useGridFormSchema(),
  },
  gridOptions: {
    columns: useGridColumns(),
    height: 'auto',
    pagerConfig: {
      enabled: true,
    },
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getOrderPage({
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
    },
  } as VxeTableGridOptions<OrderApi.Order>,
  gridEvents: {
    checkboxAll: handleRowCheckboxChange,
    checkboxChange: handleRowCheckboxChange,
  },
});
</script>

<template>
  <Page auto-content-height>
    <FormModal @success="onRefresh" />

    <Grid table-title="Temu订单列表">
      <template #toolbar-tools>
        <TableAction
          :actions="[
            // {
            //   label: $t('ui.actionTitle.create', ['Temu订单']),
            //   type: 'primary',
            //   icon: ACTION_ICON.ADD,
            //   auth: ['temu:order:create'],
            //   onClick: handleCreate,
            // },
            {
              label: '同步订单',
              type: 'primary',
              icon: ACTION_ICON.REFRESH,
              auth: ['temu:order:create'],
              onClick: handleSyncOrder,
            },
            {
              label: $t('ui.actionTitle.export'),
              type: 'primary',
              icon: ACTION_ICON.DOWNLOAD,
              auth: ['temu:order:export'],
              onClick: handleExport,
            },
            // {
            //   label: $t('ui.actionTitle.deleteBatch'),
            //   type: 'primary',
            //   danger: true,
            //   icon: ACTION_ICON.DELETE,
            //   disabled: isEmpty(checkedIds),
            //   auth: ['temu:order:delete'],
            //   onClick: handleDeleteBatch,
            // },
          ]"
        />
      </template>
      <template #actions="{ row }">
        <TableAction
          :actions="[
            {
              label: '同步详情',
              type: 'link',
              block: true,
              icon: ACTION_ICON.REFRESH,
              auth: ['temu:order:update'],
              onClick: handleSyncDetail.bind(null, row),
            },
            {
              label: '同步地址',
              type: 'link',
              ghost: true,
              icon: ACTION_ICON.REFRESH,
              auth: ['temu:order:update'],
              ifShow: () => [2, 4].includes(row.parentOrderStatus ?? -1),
              onClick: handleSyncAddress.bind(null, row),
            },
            {
              label: $t('common.edit'),
              type: 'link',
              icon: ACTION_ICON.EDIT,
              auth: ['temu:order:update'],
              onClick: handleEdit.bind(null, row),
            },
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['temu:order:delete'],
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
