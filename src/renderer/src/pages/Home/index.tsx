// https://react-icons.github.io/react-icons/icons/hi2/
import { HiBars3 } from 'react-icons/hi2'
import Split from 'react-split'
import { useState } from 'react'

import '../../assets/split.css'
import useSideBarSizes from '../../hooks/useSideBarSizes'
import { baseExplorerData } from '@renderer/data/baseExplorerData'
import { explorerData } from '@renderer/data/explorerData'
import { CreationInputType } from '@renderer/typings'

import SideBarHeader from './SideBarHeader'
import Folders from './Folders'
import Settings from './Settings'

function Home() {
  const { sideBarSizes, toggleSideBar, onDragEnd } = useSideBarSizes()
  const [menuOpen, setMenuOpen] = useState(false)
  const [creationInput, setCreationInput] = useState<CreationInputType>({
    file: { isOpen: false, value: '' },
    folder: { isOpen: false, value: '' }
  })
  // const [items, setItems] = useState([...baseExplorerData, ...explorerData])
  const [items, setItems] = useState([...baseExplorerData])

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

  return (
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
          <SideBarHeader setCreationInput={setCreationInput} />
          <Folders
            items={items}
            handleToggleFolder={handleToggleFolder}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            creationInput={creationInput}
            setCreationInput={setCreationInput}
          />
          <Settings />
        </div>
        {/* Main content */}
        <div className="h-full bg-neutral-100 dark:bg-neutral-850 w-auto">
          <div className="bg-neutral-150 dark:bg-neutral-800 w-auto min-h-16 flex justify-center items-center">
            <p className="text-xl text-neutral-900 dark:text-neutral-100">
              example &gt; example.md
            </p>
          </div>
        </div>
      </Split>
    </div>
  )
}

export default Home
