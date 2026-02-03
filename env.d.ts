/// <reference types="vite/client" />

// 声明自定义环境变量
interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  // 其他自定义环境变量可以在这里补充
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}