import { SideBarSizesType } from '@renderer/typings'
import useLocalStorage from './useLocalStorage'

export default function useSideBarSizes() {
  const {value: sideBarIsOpen, setValue: setSideBarIsOpen} = useLocalStorage<boolean>('sideBarIsOpen', true)
  const { value: sideBarSizes, setValue: setSideBarSizes } = useLocalStorage<SideBarSizesType>(
    'sideBarSizes',
    {
      sizes: [25, 75],
      gutterSize: 10
    }
  )

  function toggleSideBar() {
    setSideBarIsOpen(prev => !prev)
  }

  function onDragEnd(sizes: number[]) {
    setSideBarSizes((prev) => ({ ...prev, sizes }))
  }

  return { sideBarSizes, sideBarIsOpen, toggleSideBar, onDragEnd }
}
