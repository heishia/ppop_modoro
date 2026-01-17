/// <reference types="vite/client" />

interface ElectronAPI {
  showNotification: (title: string, body: string) => Promise<void>
  setAlwaysOnTop: (flag: boolean) => Promise<void>
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}

export {}
