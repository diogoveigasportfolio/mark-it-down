import { HiOutlineChevronRight, HiStar } from 'react-icons/hi2'

import { ExplorerItemType } from '@renderer/typings'
import { cn } from '@renderer/utils'
import { FAVORITE_FOLDER } from '@renderer/constants'

type ExplorerItemProps = {
  item: ExplorerItemType
  handleToggleFolder?: (id: string) => void
}

function ExplorerItem({ item, handleToggleFolder }: ExplorerItemProps) {
  const isFolder = 'children' in item

  return (
    <>
      {/* Explorer item */}
      <button
        className={`flex items-center gap-3 text-neutral-900 dark:text-neutral-300 ${cn(isFolder ? 'pl-4' : 'pl-9')}`}
        onClick={() => isFolder && handleToggleFolder && handleToggleFolder(item.id)}
      >
        {isFolder && (
          <HiOutlineChevronRight
            className={`size-6 transition-[transform] duration-150 ${cn({ 'rotate-90': item.isOpen })}`}
          />
        )}
        <span className="text-lg text-nowrap flex item-center gap-2">
          {
            item.id === FAVORITE_FOLDER && (
              <HiStar className='size-6'/>
            )
          }
          {item.name}
        </span>
      </button>

      {/* [Children] */}
      {item.isOpen && isFolder && (
        <section>
          <div className="pl-4 space-y-2">
            {item.children.map((child) => (
              <ExplorerItem key={child.id} item={child} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export default ExplorerItem
