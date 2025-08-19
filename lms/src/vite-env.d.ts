/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AUTH_ROUTE: string;
  readonly VITE_AUDIT_ROUTE: string;
  readonly VITE_SESSION_NAME: string;

  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  // 추가 환경변수들...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
