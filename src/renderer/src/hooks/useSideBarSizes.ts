import { SideBarSizes } from '@renderer/typings'
import useLocalStorage from './useLocalStorage'

export default function useSideBarSizes() {
  const { value: sideBarSizes, setValue: setSideBarSizes } = useLocalStorage<SideBarSizes>(
    'sideBarSizes',
    {
      sizes: [20, 80],
      gutterSize: 10
    }
  )

  function toggleSideBar() {
    if (sideBarSizes.sizes[0] <= 5)
      setSideBarSizes({
        sizes: [20, 80],
        gutterSize: 10
      })
    else
      setSideBarSizes({
        sizes: [0, 100],
        gutterSize: 0
      })
  }

  function onDragEnd(sizes: number[]) {
    setSideBarSizes((prev) => ({ ...prev, sizes }))
  }

  return { sideBarSizes, setSideBarSizes, toggleSideBar, onDragEnd }
}
