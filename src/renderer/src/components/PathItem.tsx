import { HiOutlineChevronRight } from 'react-icons/hi2'
import { useState } from 'react'

import { PathItem as PathItemType } from '@renderer/typings'
import { cn } from '@renderer/utils'

type PathItemProps = {
  item: PathItemType
}

function PathItem({ item }: PathItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  const isFolder = item.content === undefined

  if (isFolder && item.children === undefined) {
    throw new Error('A folder must have a children array, even if empty')
  }

  const hasChildren = (item.children?.length as number) > 0

  function toggleOpen() {
    if (isFolder && hasChildren) setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Path Item */}
      <button
        className={`flex items-center gap-3 text-neutral-900 dark:text-neutral-300 ${cn(isFolder ? 'pl-4' : 'pl-9')}`}
        onClick={toggleOpen}
      >
        {isFolder && (
          <HiOutlineChevronRight
            className={`size-6 transition-[transform] duration-150 ${cn({ 'rotate-90': isOpen })}`}
          />
        )}
        <span className="text-lg text-nowrap">{item.name}</span>
      </button>

      {/* [Children] */}
      <section>
        {isOpen && item.children && (
          <div className="pl-4 space-y-2">
            {item.children.map((child) => (
              <PathItem key={child.id} item={child} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}

export default PathItem
