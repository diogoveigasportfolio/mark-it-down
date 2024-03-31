import { useMemo, useRef } from 'react'
import { nanoid } from 'nanoid'

import { CreationInputType, ExplorerItemType, FileType, FolderType } from '@renderer/typings'
import ExplorerItem from '@renderer/components/ExplorerItem'
import usePointerPos from '@renderer/hooks/usePointerPos'

import MenuOptions from '@renderer/components/RightClickMenu/MenuOptions'
import MenuOption from '@renderer/components/RightClickMenu/MenuOption'
import Input from '@renderer/components/Input'

type FoldersProps = {
  items: ExplorerItemType[]
  setItems: React.Dispatch<React.SetStateAction<FolderType[]>>
  handleToggleFolder: (id: string) => void
  menuOpen: boolean
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  creationInput: CreationInputType
  setCreationInput: React.Dispatch<React.SetStateAction<CreationInputType>>
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
      return prevItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isSelected: override ? override : !item.isSelected
          }
        }
        return {
          ...item,
          isSelected: false
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

    setItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === folderId) {
          return {
            ...item,
            children: [...item.children, newFile]
          }
        }
        return item
      })
    })

    setCreationInput((prev) => ({ ...prev, file: { isOpen: false, value: '' } }))
  }

  return (
    <section className="h-full relative">
      <div className="h-full overflow-auto" onAuxClick={handleBackgroundRightClick}>
        <div>
          {creationInput.folder.isOpen && (
            <form onSubmit={handleFolderSubmit}>
              <Input
                onChange={(e) =>
                  setCreationInput((prev) => ({
                    ...prev,
                    folder: { isOpen: true, value: e.target.value }
                  }))
                }
                onBlur={() => {
                  setCreationInput((prev) => ({
                    ...prev,
                    folder: { isOpen: false, value: '' }
                  }))
                }}
              />
            </form>
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
            />
          ))}
        </div>
      </div>
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
                setCreationInput((prev) => ({
                  ...prev,
                  file: { isOpen: true, value: '' }
                }))
              }
            />
            <MenuOption
              text="Delete"
              clickHandler={() =>
                setCreationInput((prev) => ({
                  ...prev,
                  file: { isOpen: true, value: '' }
                }))
              }
            />
          </>
        )}
      </MenuOptions>
    </section>
  )
}
