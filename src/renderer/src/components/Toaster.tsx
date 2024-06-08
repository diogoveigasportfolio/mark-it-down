import { Toaster as T } from 'sonner'
import { useEffect, useState } from 'react'

type ThemeType = 'system' | 'light' | 'dark'
export default function Toaster() {
  const [theme, setTheme] = useState<ThemeType>('system')

  useEffect(() => {
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const updateTheme = (event) => {
      const newColorScheme = event.matches ? 'dark' : 'light'
      setTheme(newColorScheme)
    }

    colorSchemeQuery.addEventListener('change', updateTheme)

    // Initial theme setting
    const isDarkTheme = colorSchemeQuery.matches
    setTheme(isDarkTheme ? 'dark' : 'light')

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      colorSchemeQuery.removeEventListener('change', updateTheme)
    }
  }, [])

  return <T richColors position="bottom-right" theme={theme} />
}
