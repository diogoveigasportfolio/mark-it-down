import { useEffect, useState } from 'react'

export default function useLocalStorage<T>(key: string, initialValue?: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue == null) {
      if (typeof initialValue === 'function') {
        return (initialValue as () => T)()
      } else if (initialValue != null) {
        return initialValue
      } else {
        return []
      }
    } else {
      return JSON.parse(jsonValue)
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return { value, setValue } as { value: T; setValue: typeof setValue }
}
