import Split from 'react-split'

import { SideBarSizesType } from '@renderer/typings'

type SplitManagerProps = {
  onDragEnd: (sizes: number[]) => void
  sideBarSizes: SideBarSizesType
  sideBarIsOpen: boolean
  children: React.ReactNode
}

export function SplitManager({
  onDragEnd,
  sideBarSizes,
  sideBarIsOpen,
  children
}: SplitManagerProps) {
  if (children === undefined || children === null) {
    throw new Error('children is required when using Split Manager component')
  }

  const sideBar = children[0]
  const mainContent = children[1]

  if (!sideBarIsOpen) return <>{mainContent}</>

  return (
    <Split
      sizes={sideBarSizes.sizes}
      minSize={300}
      expandToMin={false}
      gutterSize={10}
      gutterAlign="center"
      snapOffset={30}
      dragInterval={1}
      direction="horizontal"
      cursor="col-resize"
      className="flex h-full bg-neutral-250 dark:bg-neutral-900"
      onDragEnd={onDragEnd}
    >
      {children}
    </Split>
  )
}
