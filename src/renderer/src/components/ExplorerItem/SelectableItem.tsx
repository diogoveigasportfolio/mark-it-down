import { HiOutlineChevronRight, HiOutlineStar, HiStar } from 'react-icons/hi2'

import { FAVORITE_FOLDER } from '@renderer/constants'
import { ExplorerInputType, ExplorerItemType } from '@renderer/typings'
import { cn } from '@renderer/utils'

type SelectableItemProps = {
  item: ExplorerItemType
  handleToggleFolder?: (id: string) => void
  handleToggleSelect: (id: string, override?: boolean) => void
  setRenameInput?: React.Dispatch<React.SetStateAction<ExplorerInputType>>
  favoriteFile?: (id: string) => void
  selectableChildren?: boolean
}

const SelectableItem = ({
  item,
  handleToggleFolder,
  handleToggleSelect,
  setRenameInput,
  favoriteFile,
  selectableChildren
}: SelectableItemProps) => {
  const isFolder = 'children' in item
  const isFile = 'isFavorite' in item
  const isOpen = isFolder && item.isOpen

  function handleLeftClick() {
    // Open and close folder
    if (isFolder && handleToggleFolder) handleToggleFolder(item.id)

    // Select item
    handleToggleSelect(item.id, true)
  }

  function handleDoubleLeftClick() {
    if (setRenameInput === undefined) return

    const target = isFolder ? 'folder' : 'file'
    setRenameInput((prev) => ({
      ...prev,
      [target]: { isOpen: true, value: '' }
    }))
  }

  function handleRightClick() {
    handleToggleSelect(item.id, true)
  }

  // Can only favorite files
  function handleFavoriteFileShortcut() {
    if (isFolder || favoriteFile === undefined) return

    favoriteFile(item.id)
  }

  return (
    <>
      {/* Item */}
      <button
        className={`relative group w-full flex items-center gap-3 py-1 text-neutral-900 dark:text-neutral-300 ${cn(isFolder ? 'pl-4' : 'pl-12')} ${cn(item.isSelected ? 'bg-neutral-350 dark:bg-neutral-650' : 'hover:bg-neutral-250 hover:dark:bg-neutral-750')}`}
        onClick={handleLeftClick}
        onDoubleClick={handleDoubleLeftClick}
        onAuxClick={handleRightClick}
      >
        {item.id !== FAVORITE_FOLDER && (
          <>
            {isFolder ? (
              <HiOutlineChevronRight
                strokeWidth={4}
                className={`transition-[transform] duration-150 ${cn({ 'rotate-90': item.isOpen })}`}
              />
            ) : (
              <span>📄</span>
            )}
          </>
        )}

        <span className="text-lg text-nowrap flex item-center gap-2">
          {item.id === FAVORITE_FOLDER && <HiStar className="size-6" />}
          {item.name}
        </span>

        {isFile && favoriteFile && (
          <span
            onClick={handleFavoriteFileShortcut}
            className="absolute right-5 hidden group-hover:block"
          >
            {item.isFavorite && <HiStar className="size-5" color="#fbc200" />}
            {!item.isFavorite && <HiOutlineStar className="size-5" color="#fbc200" />}
          </span>
        )}
      </button>

      {/* Children */}
      {isOpen && selectableChildren && (
        <div>
          {item.children.map((child) => (
            <SelectableItem
              key={child.id}
              item={child}
              handleToggleFolder={handleToggleFolder}
              handleToggleSelect={handleToggleSelect}
              setRenameInput={setRenameInput}
              favoriteFile={favoriteFile}
              selectableChildren
            />
          ))}
        </div>
      )}
    </>
  )
}

export default SelectableItem
