import { defineConfig } from '@vben/vite-config';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      server: {
        allowedHosts: ['test.ywwuzi.cn', 'localhost', '127.0.0.1'],
        proxy: {
          '/admin-api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/admin-api/, ''),
            // mock代理目标地址
            target: 'http://localhost:48080/admin-api',
            ws: true,
          },
        },
      },
    },
  };
});
