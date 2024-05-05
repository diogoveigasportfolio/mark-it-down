import useLocalStorage from '@renderer/hooks/useLocalStorage'
import { explorerData } from '@renderer/data/explorerData'
import { ExplorerItemType, FileType } from '@renderer/typings'

import { Header } from './components'
import SelectableItem from '@renderer/components/ExplorerItem/SelectableItem'

function Settings() {
  const { value: items, setValue: setItems } = useLocalStorage<ExplorerItemType[]>('notes', [
    ...explorerData
  ])

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

  return (
    <>
      <Header />
      {items.map((item) => (
        <SelectableItem
          key={item.id}
          item={item}
          handleToggleFolder={handleToggleFolder}
          handleToggleSelect={handleToggleSelect}
          selectableChildren={true}
        />
      ))}
    </>
  )
}

export default Settings
