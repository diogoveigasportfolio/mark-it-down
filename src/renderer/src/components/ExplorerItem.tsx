import { HiOutlineChevronRight, HiStar } from 'react-icons/hi2'

import { ExplorerInputType, ExplorerItemType } from '@renderer/typings'
import { cn } from '@renderer/utils'
import { FAVORITE_FOLDER } from '@renderer/constants'
import ExplorerInputForm from './Form/ExplorerInputForm'

type ExplorerItemProps = {
  item: ExplorerItemType
  handleToggleFolder?: (id: string) => void
  handleToggleSelect: (id: string, override?: boolean) => void
  creationInput: ExplorerInputType
  setCreationInput: React.Dispatch<React.SetStateAction<ExplorerInputType>>
  handleFileSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  renameInput: ExplorerInputType
  setRenameInput: React.Dispatch<React.SetStateAction<ExplorerInputType>>
  handleFolderRename: (e: React.FormEvent<HTMLFormElement>, id: string) => void
  handleFileRename: (e: React.FormEvent<HTMLFormElement>, id: string) => void
}

function ExplorerItem({
  item,
  handleToggleFolder,
  handleToggleSelect,
  creationInput,
  setCreationInput,
  handleFileSubmit,
  renameInput,
  setRenameInput,
  handleFolderRename,
  handleFileRename
}: ExplorerItemProps) {
  const isFolder = 'children' in item

  const isRenaming = renameInput.file.isOpen || renameInput.folder.isOpen

  const currentIsRenaming = isRenaming && item.isSelected

  function handleLeftClick() {
    // Open and close folder
    if (isFolder && handleToggleFolder) handleToggleFolder(item.id)

    // Select item
    handleToggleSelect(item.id, true)
  }

  function handleRightClick() {
    handleToggleSelect(item.id, true)
  }

  function renameFolder(e: React.FormEvent<HTMLFormElement>) {
    handleFolderRename(e, item.id)
  }

  function renameFile(e: React.FormEvent<HTMLFormElement>) {
    handleFileRename(e, item.id)
  }

  return (
    <>
      {/* Explorer item */}
      {!currentIsRenaming && (
        <button
          className={`w-full flex items-center gap-3 py-1 text-neutral-900 dark:text-neutral-300 ${cn(isFolder ? 'pl-4' : 'pl-9')} ${cn(item.isSelected ? 'bg-neutral-350 dark:bg-neutral-650' : '')}`}
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
      )}

      {/* Rename file input */}
      {currentIsRenaming && (
        <ExplorerInputForm
          handleSubmit={isFolder ? renameFolder : renameFile}
          setExplorerInput={setRenameInput}
          target={isFolder ? 'folder' : 'file'}
          currentValue={item.name}
        />
      )}

      {/* New file input */}
      {creationInput.file.isOpen && item.isSelected && (
        <ExplorerInputForm
          handleSubmit={handleFileSubmit}
          setExplorerInput={setCreationInput}
          target="file"
        />
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
                renameInput={renameInput}
                setRenameInput={setRenameInput}
                handleFolderRename={handleFolderRename}
                handleFileRename={handleFileRename}
              />
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export default ExplorerItem
