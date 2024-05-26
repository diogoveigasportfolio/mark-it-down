declare global {
  interface Window {
    theme: {
      dark: () => Promise<void>
      light: () => Promise<void>
      system: () => Promise<void>
      get: () => Promise<void>
    }
  }
}
