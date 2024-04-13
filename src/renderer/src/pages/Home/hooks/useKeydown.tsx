import { useEffect } from "react"

export default function useKeydown(key: string, callback: () => void){
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if(event.key === key){
        console.log(callback)
        callback()
      }
    }

    window.addEventListener('keydown', handler, true)
    
    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [key])
}