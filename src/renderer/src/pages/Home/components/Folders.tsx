import { useRef, useState } from 'react'
import { nanoid } from 'nanoid'

import {
  ExplorerInputType,
  ExplorerItemType,
  FileType,
  FolderType,
  SelectedItemType,
  ToastState
} from '@renderer/typings'
import ExplorerItem from '@renderer/components/ExplorerItem'
import usePointerPos from '@renderer/hooks/usePointerPos'
// import useKeydown from '../hooks/useKeydown'
import { formatDuplicateFileName, formatFileName, formatFolderName } from '@renderer/utils/naming'
import { orderFilesByName, orderFoldersByName } from '@renderer/utils/array'

import MenuOptions from '@renderer/components/RightClickMenu/MenuOptions'
import MenuOption from '@renderer/components/RightClickMenu/MenuOption'
import ExplorerInputForm from '@renderer/components/Form/ExplorerInputForm'
import Toast from '@renderer/components/Popups/Toast'

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
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const [toast, setToast] = useState<ToastState>({
    isOpen: false,
    title: '',
    message: '',
    type: 'error'
  })
  const menuRef = useRef<HTMLDivElement>(null)
  const coords = usePointerPos()

  // useKeydown('F2', handleItemRename)
  // useKeydown('Delete', () => setDeleteModalIsOpen(true))

  const anyIsSelected = selectedItem.item !== undefined
  const folderIsSelected = selectedItem.isFolder
  const fileIsSelected = !selectedItem.isFolder && selectedItem.item

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
      showErrorToast("Couldn't create folder", (error as Error).message)
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
      showErrorToast("Couldn't create file", (error as Error).message)
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
      showErrorToast("Couldn't create folder", (error as Error).message)
      return
    }

    setItems((prevItems) => {
      return prevItems.map((item) => {
        return item.id === id ? { ...item, name: name } : item
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

  function handleFileRename(e: React.FormEvent<HTMLFormElement>, id: string) {
    e.preventDefault()

    let name = ''

    try {
      name = formatFileName(renameInput.file.value)
    } catch (error) {
      showErrorToast("Couldn't rename file", (error as Error).message)
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

  function handleDeleteFile(id: string) {
    setItems((prevItems) => {
      return prevItems.map((folder) => {
        if ('children' in folder) {
          const files = folder.children.filter((file) => file.id !== id)
          return { ...folder, children: files }
        }

        return folder
      }) as ExplorerItemType[]
    })

    setDeleteModalIsOpen(false)
  }

  function closeToast() {
    setToast((prev) => ({ ...prev, isOpen: false }))
  }

  function showErrorToast(title: string, message: string) {
    setToast({
      isOpen: true,
      title,
      message,
      type: 'error'
    })
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

  function handleFileDuplication() {
    if (!selectedItem.item) return

    const duplicatedFile = {
      ...selectedItem.item,
      id: nanoid(),
      name: formatDuplicateFileName(selectedItem.item.name)
    } as FileType

    // console.log('duplicatedFile: ', duplicatedFile)
    // console.log('original file: ', selectedItem.item)

    setItems((prevItems) => {
      return prevItems.map((folder) => {
        if (folder.id === selectedItem.parentId && 'children' in folder) {
          const children = folder.children.map((file) => {
            if (file.id === selectedItem.item?.id) {
              return { ...file, isSelected: false }
            }
            return file
          })
          return {
            ...folder,
            isOpen: true,
            children: orderFilesByName([...children, duplicatedFile as FileType])
          }
        }
        return folder
      })
    })
  }

  function handleFavoriteFile(){
    if (!selectedItem.item) return

    setItems((prevItems) => {
      return prevItems.map((folder) => {
        if (folder.id === selectedItem.parentId && 'children' in folder) {
          const children = folder.children.map((file) => {
            if (file.id === selectedItem.item?.id) {
              return { ...file, isFavorite: true }
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
      {toast.isOpen && (
        <Toast title={toast.title} type={toast.type} onClose={closeToast}>
          {toast.message}
        </Toast>
      )}

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
                handleDeleteFile={handleDeleteFile}
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
      <MenuOptions ref={menuRef} menuOpen={menuOpen}>
        {!anyIsSelected && (
          <MenuOption
            text="New folder.."
            clickHandler={() =>
              setCreationInput((prev) => ({
                ...prev,
                folder: { isOpen: true, value: '' }
              }))
            }
          />
        )}
        {folderIsSelected && (
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
        {fileIsSelected && (
          <>
            <MenuOption
              text="Rename.."
              clickHandler={() =>
                setRenameInput((prev) => ({
                  ...prev,
                  file: { isOpen: true, value: '' }
                }))
              }
            />
            <MenuOption text="Delete" clickHandler={() => setDeleteModalIsOpen(true)} />
            <MenuOption text="Duplicate file" clickHandler={handleFileDuplication} />
            <MenuOption text="Mark as favorite ⭐" clickHandler={handleFavoriteFile} />
          </>
        )}
      </MenuOptions>
    </>
  )
}
