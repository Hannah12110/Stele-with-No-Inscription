import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    return {
      // 核心修改：确保 base 路径严格匹配 GitHub 仓库名，且前后都有斜杠
      // 如果依然有问题，可以尝试将其改为 './' (相对路径模式)
      base: '/stele-with-no-inscription/',

      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          // 这里的 path.resolve 确保了别名路径的正确性
          '@': path.resolve(__dirname, './src'),
        }
      },
      build: {
        // 确保打包出的资源路径能够正确引用
        outDir: 'dist',
        assetsDir: 'assets',
      }
    };
});