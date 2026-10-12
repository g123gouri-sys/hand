/// <reference types="vite/client" />

interface GoogleIdentityServices {
  accounts: {
    id: {
      initialize: (config: { client_id: string; callback: (response: { credential: string }) => void }) => void
      renderButton: (parent: HTMLElement, options: { type: string; theme: string; size: string; shape: string }) => void
    }
  }
}

interface Window {
  google?: GoogleIdentityServices
}
