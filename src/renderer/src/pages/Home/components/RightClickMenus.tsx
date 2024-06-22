import { nanoid } from 'nanoid'
import { forwardRef, useEffect, useMemo, useState } from 'react'

import MenuOption from '@renderer/components/RightClickMenu/MenuOption'
import MenuOptions from '@renderer/components/RightClickMenu/MenuOptions'
import { FAVORITE_FOLDER } from '@renderer/constants'
import { ExplorerInputType, ExplorerItemType, FileType, SelectedItemType } from '@renderer/typings'
import { orderFilesByName } from '@renderer/utils/array'
import { formatDuplicateFileName } from '@renderer/utils/naming'

type RightClickMenusProps = {
  menuOpen: boolean
  items: ExplorerItemType[]
  setItems: React.Dispatch<React.SetStateAction<ExplorerItemType[]>>
  selectedItem: SelectedItemType
  setCreationInput: React.Dispatch<React.SetStateAction<ExplorerInputType>>
  setRenameInput: React.Dispatch<React.SetStateAction<ExplorerInputType>>
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>
  folderIsSelected: boolean
}

export const RightClickMenus = forwardRef(function RightClickMenus(
  {
    menuOpen,
    items,
    setItems,
    selectedItem,
    setCreationInput,
    setRenameInput,
    setIsDeleting,
    folderIsSelected
  }: RightClickMenusProps,
  ref
) {
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    if (!menuOpen) setIsSending(false)
  }, [menuOpen])

  const anyIsSelected = selectedItem.item !== undefined
  const fileIsSelected = !selectedItem.isFolder && selectedItem.item

  const favoriteOptionText = !(selectedItem?.item as FileType)?.isFavorite
    ? 'Mark as favorite ⭐'
    : 'Unmark as favorite ❌'

  const fileIsSending = fileIsSelected && isSending
  const fileIsNotSending = fileIsSelected && !isSending

  const sendableFolders = useMemo(() => {
    return items.filter((item) => {
      const isFolder = 'children' in item
      const isNotFavoriteFolder = item.id !== FAVORITE_FOLDER
      const isNotCurrentFolder = item.id !== selectedItem.parentId

      return isFolder && isNotFavoriteFolder && isNotCurrentFolder
    })
  }, [items, selectedItem])

  function handleFileDuplication() {
    if (!selectedItem.item) return

    const duplicatedFile = {
      ...selectedItem.item,
      id: nanoid(),
      name: formatDuplicateFileName(selectedItem.item.name)
    } as FileType

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

  function handleFavoriteFile() {
    if (!selectedItem.item) return

    setItems((prevItems) => {
      return prevItems.map((folder) => {
        if (folder.id === selectedItem.parentId && 'children' in folder) {
          const children = folder.children.map((file) => {
            if (file.id === selectedItem.item?.id) {
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

  const folderOptions = sendableFolders.map((targetFolder) => {
    const onSelect = () => {
      if (!selectedItem.item) return

      setItems((folders) => {
        const removedFromCurrentFolder = folders.map((folder) => {
          if (folder.id === selectedItem.parentId && 'children' in folder) {
            return {
              ...folder,
              isSelected: false,
              isOpen: false,
              children: folder.children.filter((file) => file.id !== selectedItem.item?.id)
            }
          }
          return folder
        })

        const sendFileToNewFolder = removedFromCurrentFolder.map((folder) => {
          if (folder.id === targetFolder.id && 'children' in folder) {
            return {
              ...folder,
              isOpen: true,
              children: orderFilesByName([...folder.children, selectedItem.item as FileType])
            }
          }
          return folder
        })

        return sendFileToNewFolder
      })

      setIsSending(false)
    }

    return (
      <MenuOption
        key={`send-to-folder-${targetFolder.name}`}
        text={targetFolder.name}
        clickHandler={onSelect}
      />
    )
  })

  return (
    <MenuOptions ref={ref} menuOpen={menuOpen}>
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
          <MenuOption text="Delete" clickHandler={() => setIsDeleting(true)} />
        </>
      )}
      {fileIsNotSending && (
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
          <MenuOption text={favoriteOptionText} clickHandler={handleFavoriteFile} />
          <MenuOption
            text="Send to.."
            clickHandler={() => {
              setIsSending(true)
            }}
            closeOnClick={false}
          />
          <MenuOption text="Duplicate file" clickHandler={handleFileDuplication} />
          <MenuOption text="Delete" clickHandler={() => setIsDeleting(true)} />
        </>
      )}
      {fileIsSending && (
        <>
          <MenuOption
            text="Go back"
            clickHandler={() => setIsSending(false)}
            closeOnClick={false}
          />
          {folderOptions}
        </>
      )}
    </MenuOptions>
  )
})
