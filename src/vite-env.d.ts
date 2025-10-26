/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BRAVE_API_KEY?: string
  // Add more env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

