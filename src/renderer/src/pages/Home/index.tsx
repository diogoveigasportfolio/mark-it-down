// https://react-icons.github.io/react-icons/icons/hi2/
import { HiBars3 } from 'react-icons/hi2'
import Split from 'react-split'
import { useMemo, useState } from 'react'

import '@/assets/styles/split.css'
import useSideBarSizes from '@renderer/hooks/useSideBarSizes'
import useLocalStorage from '@renderer/hooks/useLocalStorage'
import { baseExplorerData } from '@renderer/data/baseExplorerData'
import { explorerData } from '@renderer/data/explorerData'
import { ExplorerInputType, ExplorerItemType, SelectedItemType } from '@renderer/typings'

import { SideBarHeader, Folders, Settings, MarkdownEditor, FilePath } from './components'

function Home() {
  const { sideBarSizes, toggleSideBar, onDragEnd } = useSideBarSizes()
  const [menuOpen, setMenuOpen] = useState(false)
  const [creationInput, setCreationInput] = useState<ExplorerInputType>({
    file: { isOpen: false, value: '' },
    folder: { isOpen: false, value: '' }
  })
  const { value: items, setValue: setItems } = useLocalStorage<ExplorerItemType[]>('notes', [
    ...baseExplorerData,
    ...explorerData
  ])
  // const [items, setItems] = useState([...baseExplorerData])

  const selectedItem = useMemo(() => findSelectedExplorerItem(items), [items])

  const anySelected = selectedItem.item !== undefined

  function findSelectedExplorerItem(items: ExplorerItemType[]): SelectedItemType {
    const foundItem: ExplorerItemType | undefined = items.find(
      (item: ExplorerItemType) => item.isSelected
    )

    if (foundItem) {
      return { item: foundItem, isFolder: 'children' in foundItem, parentName: undefined }
    }

    const response: SelectedItemType = { item: undefined, isFolder: false, parentName: undefined }
    items.forEach((item) => {
      if ('children' in item) {
        const result = findSelectedExplorerItem(item.children)
        if (result.item) {
          response.item = result.item
          response.parentName = item.name
        }
      }
    })

    return response
  }

  return (
    <>
      {/* Page */}
      <div className="relative h-full" onClick={() => setMenuOpen(false)}>
        <button className="group absolute top-2 left-2" onClick={() => toggleSideBar()}>
          <HiBars3 className="size-12 text-neutral-500 dark:text-neutral-500 group-hover:text-neutral-800 group-hover:dark:text-neutral-300" />
        </button>
        <Split
          sizes={sideBarSizes.sizes}
          minSize={0}
          maxSize={[450]}
          direction="horizontal"
          cursor="col-resize"
          dragInterval={1}
          gutterSize={sideBarSizes.gutterSize}
          gutterAlign="center"
          className="flex h-full bg-neutral-250 dark:bg-neutral-900"
          onDragEnd={onDragEnd}
        >
          {/* Side bar */}
          <div className="h-full bg-neutral-250 dark:bg-neutral-900 w-40 flex flex-col gap-4">
            <SideBarHeader
              setCreationInput={setCreationInput}
              setItems={setItems}
              selectedItem={selectedItem}
            />
            <Folders
              items={items}
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
            </div>
            <div className="grow overflow-clip">
              <MarkdownEditor selectedItem={selectedItem} setItems={setItems} />
            </div>
          </div>
        </Split>
      </div>
    </>
  )
}

export default Home
