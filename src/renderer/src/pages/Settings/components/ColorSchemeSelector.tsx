import { useEffect, useId, useState } from 'react'

const theme = [
  {
    value: 'system',
    text: 'System'
  },
  {
    value: 'light',
    text: 'Light'
  },
  {
    value: 'dark',
    text: 'Dark'
  }
]

export function ColorSchemeSelector() {
  const colorShemeSelectId = useId()
  const [selectedColorScheme, setSelectedColorScheme] = useState<string>('system')

  useEffect(() => {
    // @ts-ignore - window.theme is defined in the preload script
    window.theme[selectedColorScheme]()
  }, [selectedColorScheme])

  const options = theme.map((o) => {
    return (
      <option key={o.value} value={o.value}>
        {o.text}
      </option>
    )
  })

  return (
    <div className="flex items-center">
      <label
        htmlFor={colorShemeSelectId}
        className="text-xl dark:text-neutral-250 text-neutral-850 min-w-64"
      >
        Color Scheme
      </label>
      <select
        className="min-w-32 dark:bg-neutral-650 bg-neutral-250 dark:text-neutral-250 text-neutral-850 rounded-md border-none focus:ring-2 hover:cursor-pointer font-semibold form-select"
        name="color-scheme"
        id={colorShemeSelectId}
        value={selectedColorScheme}
        onChange={(e) => setSelectedColorScheme(e.target.value)}
      >
        {options}
      </select>
    </div>
  )
}
