import { CreationInputType } from '@renderer/typings'
import {
  HiOutlineFolderPlus,
  HiOutlineDocumentPlus,
  HiMiniArrowsPointingIn,
  HiEllipsisHorizontal
} from 'react-icons/hi2'

type SideBarHeaderProps = {
  setCreationInput: React.Dispatch<React.SetStateAction<CreationInputType>>
}

export default function SideBarHeader({setCreationInput} : SideBarHeaderProps) {
  function openFolderInpout(){
    setCreationInput((prev) => ({ ...prev, folder: { isOpen: true, value: '' } }))
  }

  return (
    <section className="flex items-center gap-4 justify-end mt-16 pl-6 pr-2">
      <h1 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mr-auto text-nowrap">
        My Files
      </h1>
      <div className="flex items-center gap-2 text-neutral-750 dark:text-neutral-250">
        <button className="hover:bg-neutral-350 hover:dark:bg-neutral-750 p-1 rounded-md">
          <HiOutlineDocumentPlus className="size-6 stroke-2" />
        </button>
        <button className="hover:bg-neutral-350 hover:dark:bg-neutral-750 p-1 rounded-md">
          <HiOutlineFolderPlus className="size-6 stroke-2" onClick={openFolderInpout} />
        </button>
        <button className="hover:bg-neutral-350 hover:dark:bg-neutral-750 p-1 rounded-md">
          <HiMiniArrowsPointingIn className="size-6" />
        </button>
        <button className="hover:bg-neutral-350 hover:dark:bg-neutral-750 p-1 rounded-md">
          <HiEllipsisHorizontal className="size-6 stroke-1" />
        </button>
      </div>
    </section>
  )
}
