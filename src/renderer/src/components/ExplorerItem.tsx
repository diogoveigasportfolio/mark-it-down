import { HiOutlineChevronRight, HiStar } from 'react-icons/hi2'

import { CreationInputType, ExplorerItemType } from '@renderer/typings'
import { cn } from '@renderer/utils'
import { FAVORITE_FOLDER } from '@renderer/constants'
import Input from './Input'
import { useEffect } from 'react'

type ExplorerItemProps = {
  item: ExplorerItemType
  handleToggleFolder?: (id: string) => void
  handleToggleSelect: (id: string, override?: boolean) => void
  creationInput: CreationInputType
  setCreationInput: React.Dispatch<React.SetStateAction<CreationInputType>>
  handleFileSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

function ExplorerItem({
  item,
  handleToggleFolder,
  handleToggleSelect,
  creationInput,
  setCreationInput,
  handleFileSubmit
}: ExplorerItemProps) {
  const isFolder = 'children' in item

  function handleLeftClick() {
    // Open and close folder
    if (isFolder && handleToggleFolder) handleToggleFolder(item.id)

    // Select item
    handleToggleSelect(item.id)
  }

  function handleRightClick() {
    handleToggleSelect(item.id, true)
  }

  useEffect(() => {console.log(creationInput)}, [creationInput])

  return (
    <>
      {/* Explorer item */}
      <button
        className={`w-full flex items-center gap-3 py-1 text-neutral-900 dark:text-neutral-300 ${cn(isFolder ? 'pl-4' : 'pl-9')} ${cn(item.isSelected ? 'bg-neutral-300 dark:bg-neutral-650' : '')}`}
        onClick={handleLeftClick}
        onAuxClick={handleRightClick}
      >
        {isFolder && (
          <HiOutlineChevronRight
            className={`size-6 transition-[transform] duration-150 ${cn({ 'rotate-90': item.isOpen })}`}
          />
        )}
        <span className="text-lg text-nowrap flex item-center gap-2">
          {item.id === FAVORITE_FOLDER && <HiStar className="size-6" />}
          {item.name}
        </span>
      </button>

      {/* New file input */}
      {creationInput.file.isOpen && item.isSelected && (
        <form onSubmit={handleFileSubmit}>
          <Input
            onChange={(e) =>
              setCreationInput((prev) => ({
                ...prev,
                file: { isOpen: true, value: e.target.value }
              }))
            }
            onBlur={() => {
              setCreationInput((prev) => ({
                ...prev,
                file: { isOpen: false, value: '' }
              }))
            }}
          />
        </form>
      )}

      {/* [Children] */}
      {item.isOpen && isFolder && (
        <section>
          <div className="pl-4 py-2">
            {item.children.map((child) => (
              <ExplorerItem
                key={child.id}
                item={child}
                handleToggleSelect={handleToggleSelect}
                creationInput={creationInput}
                setCreationInput={setCreationInput}
                handleFileSubmit={handleFileSubmit}
              />
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export default ExplorerItem
