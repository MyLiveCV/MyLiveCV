/// <reference types="vite/client" />

declare const appVersion: string;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ImportMetaEnv {
  readonly VITE_STRIPE_PUBLISHABLE_KEY: string;
  readonly VITE_RESUME_PREVIEW: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
