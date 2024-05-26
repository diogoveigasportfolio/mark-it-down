import settings from 'electron-settings'
import { nativeTheme } from 'electron'

type themeType = 'dark' | 'light' | 'system'

const setTheme = async (theme: themeType): Promise<void> => {
  if (!isThemeType(theme)) throw new Error('Invalid theme type')

  nativeTheme.themeSource = theme
  await settings.set('theme', theme)
}

const getTheme = async (): Promise<themeType> => {
  if (await settings.has('theme')) {
    const theme = await settings.get('theme')

    if (typeof theme === 'string' && isThemeType(theme)) {
      return theme
    }
  }

  return Promise.resolve('system')
}

const initializeTheme = async (): Promise<void> => {
  if (await settings.has('theme')) {
    const theme = await settings.get('theme')

    if (typeof theme === 'string' && isThemeType(theme)) {
      nativeTheme.themeSource = theme
      return
    }
  }

  nativeTheme.themeSource = 'system'
}

export { setTheme, initializeTheme, getTheme }

function isThemeType(theme: string): theme is themeType {
  return theme === 'dark' || theme === 'light' || theme === 'system'
}
