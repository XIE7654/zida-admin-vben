<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { Page } from '@vben/common-ui';

import { exchangeOAuthToken } from '#/api/ebay/store';

const router = useRouter();
const status = ref<'' | 'error' | 'success'>('');
// Vue Router 拿 URL 参数
// const route = useRoute();

const goStore = () => {
  router.push('/ebay/store');
};

onMounted(async () => {
  // const code = route.query.code as string;
  // const state = route.query.state as string;
  // code中存在#，改从window.location.href 里自己截取
  const fullUrl = window.location.href;

  // 取出 state
  const stateMatch = fullUrl.match(/state=([^&]+)/);
  const state = stateMatch ? stateMatch[1] : null;

  // 取出 code（包含 # 后面的内容）
  const codeMatch = fullUrl.match(/code=([^&]+)/);
  let code = codeMatch ? codeMatch[1] : null;

  if (code && fullUrl.includes('#')) {
    // 拼接 fragment 部分
    code += decodeURIComponent(
      fullUrl.slice(Math.max(0, fullUrl.indexOf('#'))),
    );
    code = code.replace(/&expires_in=\d+$/, '');
  }

  if (!code || !state) {
    status.value = 'error';
    return;
  }

  try {
    // 发送请求给后端，换取 access_token
    const res = await exchangeOAuthToken({ code, storeId: state });

    if (res) {
      // 假设返回里有 token
      status.value = 'success';
    } else {
      status.value = 'error';
    }
  } catch (error) {
    console.error('换取 token 出错:', error);
    status.value = 'error';
  }
});
</script>

<template>
  <Page auto-content-height>
    <a-result v-if="!status" title="等待授权中">
      <template #extra>
      </template>
    </a-result>
    <a-result
      v-if="status === 'success'"
      status="success"
      title="授权成功!"
    >
      <template #extra>
        <a-button key="console" type="primary" @click="goStore">返回店铺</a-button>
      </template>
    </a-result>
    <a-result
      v-if="status === 'error'"
      status="warning"
      title="授权失败，请联系管理员."
    >
      <template #extra>
        <!--        <a-button key="console" type="primary">Go Console</a-button>-->
      </template>
    </a-result>
  </Page>
</template>

<style scoped lang="scss"></style>
