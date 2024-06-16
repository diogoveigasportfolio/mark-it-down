import SelectableItem from '@renderer/components/ExplorerItem/SelectableItem'
import { ExplorerItemType, FileType } from '@renderer/typings'

type SidebarProps = {
  items: ExplorerItemType[]
  setItems: React.Dispatch<React.SetStateAction<ExplorerItemType[]>>
}

export function Sidebar({ items, setItems }: SidebarProps) {
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
    <section className="h-full bg-neutral-250 dark:bg-neutral-900 w-40 flex flex-col">
      <h1 className="text-nowrap p-4">
        <span className="text-lg font-medium text-neutral-900 dark:text-neutral-100">My Files</span>
        <span className="italic text-neutral-800 dark:text-neutral-200 text-base ml-3">
          ~ Simplified
        </span>
      </h1>
      {items.map((item) => (
        <SelectableItem
          key={item.id}
          item={item}
          handleToggleFolder={handleToggleFolder}
          handleToggleSelect={handleToggleSelect}
          selectableChildren={true}
        />
      ))}
    </section>
  )
}
