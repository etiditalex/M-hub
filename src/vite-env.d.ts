/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BRAVE_API_KEY?: string
  readonly VITE_API_BASE_URL?: string
  readonly VITE_OPENAI_API_KEY?: string
  // Add more env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

