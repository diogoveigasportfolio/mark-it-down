import { forwardRef } from 'react'
import { cn } from '@renderer/utils'

type MenuOptionsProps = {
  children?: React.ReactNode
  menuOpen: boolean
}

const MenuOptions = forwardRef(function MenuOptions({ children, menuOpen }: MenuOptionsProps, ref) {
  return (
    <ul
      // @ts-ignore eslint-disable-next-line
      ref={ref}
      className={`absolute min-w-60 p-2 space-y-1 divide-neutral-500 bg-neutral-750 rounded-lg ${cn(menuOpen ? 'block' : 'hidden')}`}
    >
      {children}
    </ul>
  )
})

export default MenuOptions
