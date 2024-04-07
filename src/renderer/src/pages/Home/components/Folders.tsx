import { useMemo, useRef, useState } from 'react'
import { nanoid } from 'nanoid'

import { ExplorerInputType, ExplorerItemType, FileType, FolderType } from '@renderer/typings'
import ExplorerItem from '@renderer/components/ExplorerItem'
import usePointerPos from '@renderer/hooks/usePointerPos'

import MenuOptions from '@renderer/components/RightClickMenu/MenuOptions'
import MenuOption from '@renderer/components/RightClickMenu/MenuOption'
import ExplorerInputForm from '@renderer/components/Form/ExplorerInputForm'

type FoldersProps = {
  items: ExplorerItemType[]
  setItems: React.Dispatch<React.SetStateAction<FolderType[]>>
  handleToggleFolder: (id: string) => void
  menuOpen: boolean
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  creationInput: ExplorerInputType
  setCreationInput: React.Dispatch<React.SetStateAction<ExplorerInputType>>
}

export default function Folders({
  items,
  setItems,
  handleToggleFolder,
  menuOpen,
  setMenuOpen,
  creationInput,
  setCreationInput
}: FoldersProps) {
  const [renameInput, setRenameInput] = useState<ExplorerInputType>({
    file: { isOpen: false, value: '' },
    folder: { isOpen: false, value: '' }
  })
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const coords = usePointerPos()

  const currentlySelected = useMemo(() => findSelectedExplorerItem(items), [items])

  function handleBackgroundRightClick(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault()

    if (!menuRef.current) return

    menuRef.current.style.left = `${coords.x}px`
    menuRef.current.style.top = `${coords.y}px`

    setMenuOpen(true)
  }

  function handleFolderSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const newFolder: FolderType = {
      id: nanoid(),
      name: creationInput.folder.value,
      isOpen: false,
      isSelected: false,
      children: []
    }

    setItems((prevItems) => [...prevItems, newFolder])

    setCreationInput((prev) => ({ ...prev, folder: { isOpen: false, value: '' } }))
  }

  function handleToggleSelect(id: string, override?: boolean) {
    setItems((prevItems) => {
      return prevItems.map((folder) => {
        if (folder.id === id) {
          return {
            ...folder,
            isSelected: override ? override : !folder.isSelected
          }
        }
        return {
          ...folder,
          isSelected: false,
          children: folder.children.map((file) => {
            if (file.id === id) {
              return {
                ...file,
                isSelected: override ? override : !file.isSelected
              }
            }
            return {
              ...file,
              isSelected: false
            }
          })
        }
      })
    })
  }

  function findSelectedExplorerItem(items): { item: ExplorerItemType; isFolder: boolean } {
    let foundItem = items.find((item: ExplorerItemType) => item.isSelected)

    if (foundItem) {
      return { item: foundItem, isFolder: 'children' in foundItem }
    }

    items.forEach((item) => {
      if ('children' in item) {
        const result = findSelectedExplorerItem(item.children)
        if (result.item) {
          foundItem = result
        }
      }
    })

    return { item: foundItem, isFolder: false }
  }

  function handleFileSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const newFile: FileType = {
      id: nanoid(),
      name: creationInput.file.value,
      isSelected: false,
      content: '',
      isFavorite: false
    }

    const folderId = currentlySelected.item.id

    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === folderId) {
          return {
            ...item,
            isOpen: true,
            children: [...item.children, newFile]
          }
        }
        return item
      })
    })

    setCreationInput((prev) => ({ ...prev, file: { isOpen: false, value: '' } }))
  }

  function handleFolderRename(e: React.FormEvent<HTMLFormElement>, id: string) {
    e.preventDefault()

    setItems((prevItems) => {
      return prevItems.map((item) => {
        return item.id === id ? { ...item, name: renameInput.folder.value } : item
      })
    })

    setRenameInput((prev) => ({ ...prev, folder: { isOpen: false, value: '' } }))
  }

  function handleDeleteFolder(id: string) {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.id !== id)
    })

    setDeleteModalIsOpen(false)
  }

  function handleFileRename(e: React.FormEvent<HTMLFormElement>) {
    // TODO: Implement file rename
    console.log('handleFileRename')
  }

  return (
    <>
      <section className="h-full relative overflow-hidden">
        <div className="h-full overflow-auto" onAuxClick={handleBackgroundRightClick}>
          <div>
            {creationInput.folder.isOpen && (
              <ExplorerInputForm
                handleSubmit={handleFolderSubmit}
                setExplorerInput={setCreationInput}
                target="folder"
              />
            )}
            {items.map((item) => (
              <ExplorerItem
                key={item.id}
                item={item}
                handleToggleFolder={handleToggleFolder}
                handleToggleSelect={handleToggleSelect}
                creationInput={creationInput}
                setCreationInput={setCreationInput}
                handleFileSubmit={handleFileSubmit}
                renameInput={renameInput}
                setRenameInput={setRenameInput}
                handleFolderRename={handleFolderRename}
                deleteModalIsOpen={deleteModalIsOpen}
                setDeleteModalIsOpen={setDeleteModalIsOpen}
                handleDeleteFolder={handleDeleteFolder}
                handleFileRename={handleFileRename}
              />
            ))}
            <div className="w-full h-screen" onClick={() => handleToggleSelect('')} />
          </div>
        </div>
      </section>
      <MenuOptions ref={menuRef} menuOpen={menuOpen}>
        <MenuOption
          text="New folder.."
          clickHandler={() =>
            setCreationInput((prev) => ({
              ...prev,
              folder: { isOpen: true, value: '' }
            }))
          }
        />
        {currentlySelected && currentlySelected.isFolder && (
          <>
            <MenuOption
              text="New file.."
              clickHandler={() =>
                setCreationInput((prev) => ({
                  ...prev,
                  file: { isOpen: true, value: '' }
                }))
              }
            />
            <MenuOption
              text="Rename.."
              clickHandler={() =>
                setRenameInput((prev) => ({
                  ...prev,
                  folder: { isOpen: true, value: '' }
                }))
              }
            />
            <MenuOption text="Delete" clickHandler={() => setDeleteModalIsOpen(true)} />
          </>
        )}
      </MenuOptions>
    </>
  )
}
