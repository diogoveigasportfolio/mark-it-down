// https://react-icons.github.io/react-icons/icons/hi2/
import {
  HiBars3,
  HiOutlineCog6Tooth,
  HiOutlineFolderPlus,
  HiOutlineDocumentPlus,
  HiOutlineChevronRight
} from 'react-icons/hi2'
import Split from 'react-split'

import { cn } from '../../utils/index'
import '../../assets/split.css'
import useSideBarSizes from '../../hooks/useSideBarSizes'

function Home() {
  const { sideBarSizes, setSideBarSizes, toggleSideBar } = useSideBarSizes()

  return (
    <div className="relative h-full">
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
        onDragEnd={(sizes) => setSideBarSizes((prev) => ({ ...prev, sizes }))}
      >
        {/* Side bar */}
        <div className="h-full bg-neutral-250 dark:bg-neutral-900 w-40 flex flex-col">
          <button className="text-lg text-neutral-750 dark:text-neutral-250 w-full min-h-16 bg-gradient-to-r from-60% from-neutral-200 dark:from-neutral-850 to-neutral-250 dark:to-neutral-900 hover:from-neutral-150 hover:dark:from-neutral-800 active:from-neutral-100 active:dark:from-neutral-750 mt-auto">
            <span className="flex pl-6 items-center gap-4">
              <HiOutlineCog6Tooth className="size-6" /> Settings
            </span>
          </button>
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
