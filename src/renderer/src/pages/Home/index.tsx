// https://react-icons.github.io/react-icons/icons/hi2/
import { HiBars3 } from 'react-icons/hi2'
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
        className="flex h-full bg-neutral-150 dark:bg-neutral-900"
        onDragEnd={(sizes) => setSideBarSizes((prev) => ({ ...prev, sizes }))}
      >
        <div className="h-full bg-neutral-150 dark:bg-neutral-900 w-40"></div>
        <div className="h-full bg-neutral-200 dark:bg-neutral-850 w-auto">
          <div className="bg-neutral-250 dark:bg-neutral-800 w-auto min-h-16 flex justify-center items-center">
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
