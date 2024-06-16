import { useEffect, useState } from 'react'

import { ExplorerInputType, ExplorerItemType } from '@renderer/typings'

import { toast } from 'sonner'
import ExplorerInputForm from '../Form/ExplorerInputForm'
import SelectableItem from './SelectableItem'

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
  handleDeleteFolder: (id: string) => () => void
  isDeleting: boolean
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>
  handleFileRename: (e: React.FormEvent<HTMLFormElement>, id: string) => void
  handleDeleteFile: (id: string) => () => void
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
  handleDeleteFolder,
  isDeleting,
  setIsDeleting,
  handleFileRename,
  handleDeleteFile
}: ExplorerItemProps) {
  const [toasted, setToasted] = useState(false)
  const isFolder = 'children' in item

  const isRenaming = renameInput.file.isOpen || renameInput.folder.isOpen

  const currentIsRenaming = isRenaming && item.isSelected

  const currentIsDeleting = isDeleting && item.isSelected

  useEffect(() => {
    if (currentIsDeleting && !toasted) {
      setToasted(true)
      if (isFolder) deleteFolder()
      else deleteFile()

      setTimeout(() => setToasted(false), 3000)
    }
  }, [currentIsDeleting, toasted, item.id])

  function renameFolder(e: React.FormEvent<HTMLFormElement>) {
    handleFolderRename(e, item.id)
  }

  function deleteFolder() {
    const undoFunction = handleDeleteFolder(item.id)
    toast('You deleted a folder', {
      action: {
        label: 'Undo',
        onClick: () => undoFunction()
      }
    })
  }

  function renameFile(e: React.FormEvent<HTMLFormElement>) {
    handleFileRename(e, item.id)
  }

  function deleteFile() {
    const undoFunction = handleDeleteFile(item.id)
    toast('You deleted a file', {
      action: {
        label: 'Undo',
        onClick: () => undoFunction()
      }
    })
  }

  return (
    <>
      {/* Explorer item */}
      {!currentIsRenaming && (
        <SelectableItem
          item={item}
          handleToggleSelect={handleToggleSelect}
          handleToggleFolder={handleToggleFolder}
          setRenameInput={setRenameInput}
        />
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
              handleDeleteFolder={handleDeleteFolder}
              isDeleting={isDeleting}
              setIsDeleting={setIsDeleting}
              handleFileRename={handleFileRename}
              handleDeleteFile={handleDeleteFile}
            />
          ))}
        </section>
      )}
    </>
  )
}

export default ExplorerItem
