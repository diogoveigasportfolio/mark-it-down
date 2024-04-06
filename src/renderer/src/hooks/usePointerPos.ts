import { useEffect, useState } from 'react'

export default function usePointerPos(): { x: number; y: number } {
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleWindowMouseMove = (event) => {
      setCoords({
        x: event.clientX + 5,
        y: event.clientY - 20
      })
    }
    window.addEventListener('mousemove', handleWindowMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove)
    }
  }, [])

  return coords
}
