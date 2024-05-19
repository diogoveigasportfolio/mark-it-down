// https://react-icons.github.io/react-icons/icons/hi2/
import { HiBars3 } from 'react-icons/hi2'
import { useMemo, useState } from 'react'

import useSideBarSizes from '@renderer/hooks/useSideBarSizes'
import useLocalStorage from '@renderer/hooks/useLocalStorage'
import { explorerData } from '@renderer/data/explorerData'
import { ExplorerInputType, ExplorerItemType, FileType, SelectedItemType } from '@renderer/typings'

import {
  SideBarHeader,
  Folders,
  Settings,
  MarkdownEditor,
  FilePath,
} from './components'
import MarkdownModeSwitcher from '@renderer/components/Markdown/MarkdownModeSwitcher'
import SplitManager from '@renderer/components/SplitManager'
import { baseExplorerData } from '@renderer/data/baseExplorerData'

function Home() {
  const { sideBarSizes, sideBarIsOpen, toggleSideBar, onDragEnd } = useSideBarSizes()
  const [menuOpen, setMenuOpen] = useState(false)
  const [creationInput, setCreationInput] = useState<ExplorerInputType>({
    file: { isOpen: false, value: '' },
    folder: { isOpen: false, value: '' }
  })
  const { value: items, setValue: setItems } = useLocalStorage<ExplorerItemType[]>('notes', [
    ...explorerData
  ])
  const [isEditingMarkdown, setIsEditingMarkdown] = useState(false)

  const selectedItem = useMemo(() => findSelectedExplorerItem(items), [items])

  const anySelected = selectedItem.item !== undefined

  function findSelectedExplorerItem(items: ExplorerItemType[]): SelectedItemType {
    const foundItem: ExplorerItemType | undefined = items.find(
      (item: ExplorerItemType) => item.isSelected
    )

    if (foundItem) {
      return { item: foundItem, isFolder: 'children' in foundItem, parentName: undefined }
    }

    const response: SelectedItemType = { item: undefined, isFolder: false }
    items.forEach((item) => {
      if ('children' in item) {
        const result = findSelectedExplorerItem(item.children)
        if (result.item) {
          response.item = result.item
          response.parentName = item.name
          response.parentId = item.id
        }
      }
    })

    return response
  }

  function getFavoriteItems(items: ExplorerItemType[]): FileType[] {
    const favorites: FileType[] = []

    items.forEach((item) => {
      if ('children' in item) {
        const children = item.children
        children.forEach((child) => {
          if (child.isFavorite) {
            favorites.push(child)
          }
        })
      }
    })

    return favorites
  }

  const favoriteFolder = baseExplorerData[0]
  favoriteFolder.children = getFavoriteItems(items)

  return (
    <>
      {/* Page */}
      <div className="relative h-full" onClick={() => setMenuOpen(false)}>
        <button className="group absolute top-2 left-2" onClick={() => toggleSideBar()}>
          <HiBars3 className="size-12 text-neutral-500 dark:text-neutral-500 group-hover:text-neutral-800 group-hover:dark:text-neutral-300" />
        </button>
        <SplitManager
          onDragEnd={onDragEnd}
          sideBarSizes={sideBarSizes}
          sideBarIsOpen={sideBarIsOpen}
        >
          {/* Side bar */}
          <div className="h-full bg-neutral-250 dark:bg-neutral-900 w-40 flex flex-col gap-4">
            <SideBarHeader
              setCreationInput={setCreationInput}
              setItems={setItems}
              selectedItem={selectedItem}
            />
            <Folders
              items={[favoriteFolder, ...items]}
              setItems={setItems}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              creationInput={creationInput}
              setCreationInput={setCreationInput}
              selectedItem={selectedItem}
            />
            <Settings />
          </div>
          {/* Main content */}
          <div className="h-full bg-neutral-100 dark:bg-neutral-850 w-auto flex flex-col overflow-hidden">
            <div className="bg-neutral-150 dark:bg-neutral-800 w-auto min-h-16 flex justify-center items-center">
              <FilePath anySelected={anySelected} selectedItem={selectedItem} />
              <MarkdownModeSwitcher
                isEditing={isEditingMarkdown}
                setIsEditing={setIsEditingMarkdown}
              />
            </div>
            <div className="grow overflow-clip">
              <MarkdownEditor
                selectedItem={selectedItem}
                setItems={setItems}
                isEditing={isEditingMarkdown}
                setIsEditing={setIsEditingMarkdown}
              />
            </div>
          </div>
        </SplitManager>
      </div>
    </>
  )
}

export default Home
