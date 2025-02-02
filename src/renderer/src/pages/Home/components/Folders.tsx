import { nanoid } from 'nanoid'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

import ExplorerItem from '@renderer/components/ExplorerItem'
import usePointerPos from '@renderer/hooks/usePointerPos'
import {
  ExplorerInputType,
  ExplorerItemType,
  FileType,
  FolderType,
  SelectedItemType
} from '@renderer/typings'
// import useKeydown from '../hooks/useKeydown'
import { getClonedUndoArray, orderFilesByName, orderFoldersByName } from '@renderer/utils/array'
import { formatFileName, formatFolderName } from '@renderer/utils/naming'

import ExplorerInputForm from '@renderer/components/Form/ExplorerInputForm'
import useKeydown from '@renderer/hooks/useKeydown'
import { RightClickMenus } from './RightClickMenus'

type FoldersProps = {
  items: ExplorerItemType[]
  setItems: React.Dispatch<React.SetStateAction<ExplorerItemType[]>>
  menuOpen: boolean
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  creationInput: ExplorerInputType
  setCreationInput: React.Dispatch<React.SetStateAction<ExplorerInputType>>
  selectedItem: SelectedItemType
}

export function Folders({
  items,
  setItems,
  menuOpen,
  setMenuOpen,
  creationInput,
  setCreationInput,
  selectedItem
}: FoldersProps) {
  const [renameInput, setRenameInput] = useState<ExplorerInputType>({
    file: { isOpen: false, value: '' },
    folder: { isOpen: false, value: '' }
  })
  const [isDeleting, setIsDeleting] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const coords = usePointerPos()

  useKeydown('F2', handleItemRename)
  // useKeydown('Delete', () => setIsDeleting(true))

  const folderIsSelected = selectedItem.isFolder

  function handleBackgroundRightClick(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault()

    if (!menuRef.current) return

    menuRef.current.style.left = `${coords.x}px`
    menuRef.current.style.top = `${coords.y}px`

    setMenuOpen(true)
  }

  function handleToggleFolder(id: string) {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if ('children' in item && item.id === id) {
          return {
            ...item,
            isOpen: !item.isOpen
          }
        }
        return item
      })
    })
  }

  function handleFolderSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    let name = ''

    try {
      name = formatFolderName(creationInput.folder.value)
    } catch (error) {
      toast.error("Couldn't create folder", { description: (error as Error).message })
      return
    }

    const newFolder: FolderType = {
      id: nanoid(),
      name,
      isOpen: false,
      isSelected: false,
      children: []
    }

    const updatedFolders = orderFoldersByName([...items, newFolder] as FolderType[])
    setItems(updatedFolders)

    setCreationInput((prev) => ({ ...prev, folder: { isOpen: false, value: '' } }))
  }

  function handleToggleSelect(id: string, override?: boolean) {
    setItems((prevItems) => {
      return prevItems.map((folder) => {
        if (!('children' in folder)) return folder

        if (folder.id === id) {
          return {
            ...folder,
            isSelected: override ? override : !folder.isSelected,
            children: childrenSelection(folder.children)
          }
        }
        return {
          ...folder,
          isSelected: false,
          children: childrenSelection(folder.children)
        }
      })
    })

    function childrenSelection(files: FileType[]) {
      return files.map((file) => {
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
  }

  function handleFileSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    let name = ''

    try {
      name = formatFileName(creationInput.file.value)
    } catch (error) {
      toast.error("Couldn't create file", { description: (error as Error).message })
      return
    }

    const newFile: FileType = {
      id: nanoid(),
      name: name,
      isSelected: false,
      content: '',
      isFavorite: false
    }

    const folderId = selectedItem?.item?.id

    setItems((prevItems) => {
      return prevItems.map((folder) => {
        if (folder.id === folderId && 'children' in folder) {
          return {
            ...folder,
            isOpen: true,
            children: orderFilesByName([...folder.children, newFile])
          }
        }
        return folder
      })
    })

    handleToggleSelect(newFile.id, true)

    setCreationInput((prev) => ({ ...prev, file: { isOpen: false, value: '' } }))
  }

  function handleFolderRename(e: React.FormEvent<HTMLFormElement>, id: string) {
    e.preventDefault()

    let name = ''

    try {
      name = formatFolderName(renameInput.folder.value)
    } catch (error) {
      toast.error("Couldn't rename folder", { description: (error as Error).message })
      return
    }

    setItems((prevItems) => {
      return prevItems.map((item) => {
        return item.id === id ? { ...item, name: name } : item
      })
    })

    setRenameInput((prev) => ({ ...prev, folder: { isOpen: false, value: '' } }))
  }

  function handleDeleteFolder(id: string): () => void {
    const clonedItems = getClonedUndoArray(items)

    setItems((prevItems) => {
      return prevItems.filter((item) => item.id !== id)
    })

    setIsDeleting(false)

    return () => {
      setItems(clonedItems)
    }
  }

  function handleFileRename(e: React.FormEvent<HTMLFormElement>, id: string) {
    e.preventDefault()

    let name = ''

    try {
      name = formatFileName(renameInput.file.value)
    } catch (error) {
      toast.error("Couldn't rename file", { description: (error as Error).message })
      return
    }

    setItems((prevItems) => {
      return prevItems.map((folder) => {
        if ('children' in folder) {
          const updatedChildren = folder.children.map((file) => {
            if (file.id === id) {
              return { ...file, name }
            }
            return file
          })
          return { ...folder, children: updatedChildren }
        }
        return folder
      })
    })

    setRenameInput((prev) => ({ ...prev, file: { isOpen: false, value: '' } }))
  }

  function handleDeleteFile(id: string): () => void {
    const clonedItems = getClonedUndoArray(items)

    setItems((prevItems) => {
      return prevItems.map((folder) => {
        if ('children' in folder) {
          const files = folder.children.filter((file) => file.id !== id)
          return { ...folder, children: files }
        }

        return folder
      }) as ExplorerItemType[]
    })

    setIsDeleting(false)

    return () => {
      setItems(clonedItems)
    }
  }

  function handleItemRename() {
    const renameItemType = folderIsSelected ? 'folder' : 'file'

    setRenameInput((prev) => ({ ...prev, [renameItemType]: { isOpen: true, value: '' } }))
  }

  function handleDeselectAll() {
    handleToggleSelect('')
    setRenameInput((prev) => ({
      ...prev,
      file: { isOpen: false, value: '' },
      folder: { isOpen: false, value: '' }
    }))
  }

  function favoriteFile(id: string) {
    setItems((prevItems) => {
      return prevItems.map((folder) => {
        if ('children' in folder) {
          const children = folder.children.map((file) => {
            if (file.id === id) {
              return { ...file, isFavorite: !file.isFavorite }
            }
            return file
          })
          return {
            ...folder,
            children: children
          }
        }
        return folder
      })
    })
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
                isDeleting={isDeleting}
                setIsDeleting={setIsDeleting}
                handleDeleteFolder={handleDeleteFolder}
                handleFileRename={handleFileRename}
                handleDeleteFile={handleDeleteFile}
                favoriteFile={favoriteFile}
              />
            ))}
            <div
              className="w-full h-screen"
              onClick={handleDeselectAll}
              onAuxClick={handleDeselectAll}
            />
          </div>
        </div>
      </section>
      <RightClickMenus
        ref={menuRef}
        menuOpen={menuOpen}
        items={items}
        setItems={setItems}
        selectedItem={selectedItem}
        setCreationInput={setCreationInput}
        setRenameInput={setRenameInput}
        setIsDeleting={setIsDeleting}
        folderIsSelected={folderIsSelected}
      />
    </>
  )
}
